import { defineStore } from 'pinia';
import { FetchError } from 'ofetch';
import { WorkListResponseSchema, type WorkListResponse } from '~/types/microcms';
import { ZodError } from 'zod';
// export const useWorkStore = defineStore('work', () => {
//   const works = ref<WorkListResponseSchema<WorkItem> | null>(null)
//   const pending = ref(false)
//   const errorStatus = ref<number | null>(null);
//   const errorMessage = ref<string | null>(null);
//   const searchQuery = ref('')
//   const sortOrder = ref<'asc' | 'desc'>('asc')
//   const selectedCategories = ref<string[]>([])
//   const selectedWorkTypes = ref<string[]>([])

//   const workList = computed(() => works.value?.contents || [])
// データを取得するアクション
// const fetchWorks = async () => {
//   // すでにデータがある場合は再取得しない
//   if (works.value) return

//   pending.value = true;
//   errorStatus.value = null;
//   errorMessage.value = null;

//   try {
//     // const data = await $fetch<WorkListResponseSchema<WorkItem>>('/api/works')
//     const data = await $fetch<WorkListResponseSchema<WorkItem>>('/api/works')
//     console.log('API Raw Data:', data);
//     if (data) {
//       works.value = data
//     }
//   } catch (e) {
//     if (e instanceof FetchError) {
//       // HTTPエラー（404, 500など）の場合
//       errorStatus.value = e.status || 500;
//       errorMessage.value = e.statusMessage || '通信エラーが発生しました';
//     } else if (e instanceof Error) {
//       // それ以外の標準的なJSエラー
//       errorMessage.value = e.message;
//     } else {
//       // 全く未知のエラー
//       errorMessage.value = '予期せぬエラーが発生しました';
//     }
//     console.error('[Fetch Error]:', e);
//   } finally {
//     pending.value = false
//   }
// }

// return {
//   works,
//   workList,
//   pending,
//   searchQuery,
//   sortOrder,
//   selectedCategories,
//   selectedWorkTypes,
//   errorStatus,
//   errorMessage,
//   fetchWorks
// };

// })

export const useWorkStore = defineStore('work', {
	state: () => ({
		works: null as WorkListResponse | null,
		pending: false,
		error: null as {
			statusCode?: number;
			statusMessage?: string;
			message: string;
		} | null,
		errorStatus: null as number | null,
		errorMessage: null as string | null,
		// フィルタ条件もストア管理にすると、詳細ページから戻っても保持されます
		searchQuery: '',
		sortOrder: 'asc' as 'asc' | 'desc',
		selectedCategories: [] as string[],
		selectedWorkTypes: [] as string[],
	}),
	getters: {
		workList: state => state.works?.contents || [],
	},
	actions: {
		async fetchWorks() {
			if (this.works) return;

			this.pending = true;
			this.error = null; // 以前のエラーをリセット

			try {
				const response = await $fetch<unknown>('/api/works', {
					params: {
						t: Date.now(), // 毎回違う値になるためキャッシュを強制回避
					},
				});
				const validatedData = WorkListResponseSchema.parse(response);

				// バリデーション実行
				this.works = validatedData;
				console.log('取得・検証成功:', this.works);
			}
			catch (err: unknown) {
				// --- エラーオブジェクトの作成 ---
				if (err instanceof ZodError) {
					this.error = {
						statusCode: 422,
						message: `バリデーション失敗: ${err.issues.map(i => i.path.join('.')).join(', ')}`,
					};
				}
				else if (err instanceof FetchError) {
					this.error = {
						statusCode: err.statusCode ?? 500,
						statusMessage: err.statusMessage,
						message: err.message,
					};
				}
				else {
					this.error = {
						statusCode: 500,
						message: err instanceof Error ? err.message : '予期せぬエラー',
					};
				}

				// ★ 修正：catchの中なら this.error は確実に存在するので安全にログが出せる
				console.error(`[${this.error.statusCode}] ${this.error.message}`);
			}
			finally {
				// finally は「成否に関わらず最後に行う後処理」だけにする
				this.pending = false;
			}
		},
	},
});
