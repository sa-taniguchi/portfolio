import { defineStore } from 'pinia';
import { FetchError } from 'ofetch';
import { SkillResponseSchema, type SkillResponse } from '~/types/microcms';
import { ZodError } from 'zod';

export const useSkillStore = defineStore('skill', {
	state: () => ({
		skill: null as SkillResponse | null,
		pending: false,
		error: null as {
			statusCode?: number;
			statusMessage?: string;
			message: string;
		} | null,
		errorStatus: null as number | null,
		errorMessage: null as string | null,
	}),
	getters: {
		skillList: state => state.skill?.contents || [],
	},
	actions: {
		async fetchSkill() {
			if (this.skill) return;
			this.pending = true;
			this.error = null;
			try {
				const response = await $fetch<unknown>('/api/skills');

				const validatedData = SkillResponseSchema.parse(response);

				// バリデーション実行
				this.skill = validatedData;
				console.log('取得・検証成功');
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
