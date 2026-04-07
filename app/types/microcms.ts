import { z } from 'zod';

// --- Skill Item Schema ---
export const SkillItemSchema = z.object({
	'id': z.string(),
	'skill-title': z.string(),
	'skill-text': z.string(),
});

// --- Work Item Schema ---
export const WorkItemSchema = z.object({
	id: z.string(),
	publishedAt: z.string(),
	title: z.string(),
	category: z.object({
		categoryId: z.string(),
		label: z.string(),
	}),
	workType: z.array(z.object({
		workTypeId: z.string(),
		label: z.string(),
	})),
	scope: z.string(),
	mvImages: z.array(z.object({
		url: z.url(),
		height: z.number(),
		width: z.number(),
	})),
	startDate: z.string(),
	endDate: z.string(),
	skill: z.array(z.object({
		fieldId: z.literal('skill'),
		skill: z.string(),
	})).transform(skills => skills.map(s => s.skill)),
	content: z.string(), // 任意項目
	url: z.string().url().optional(),
});

// --- Generic MicroCMS List Response Helper ---
// 汎用的なレスポンスラッパーを作る関数
export const createMicroCMSListSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
	z.object({
		contents: z.array(itemSchema),
		totalCount: z.number(),
		offset: z.number(),
		limit: z.number(),
	});

// 実際のレスポンス用スキーマ
export const SkillResponseSchema = createMicroCMSListSchema(SkillItemSchema);
export const WorkListResponseSchema = createMicroCMSListSchema(WorkItemSchema);

// --- 型の抽出 (interface の代わりに使用) ---
export type WorkItem = z.infer<typeof WorkItemSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type WorkListResponse = z.infer<typeof WorkListResponseSchema>;
export type SkillResponse = z.infer<typeof SkillResponseSchema>;

// // MicroCMS
// export interface MicroCMSListResponse<T> {
//   contents: T[];
//   totalCount: number;
//   offset: number;
//   limit: number;
// }

// // skill
// export interface SkillItem {
//   id: string;
//   'skill-title': string;
//   'skill-text': string;
// }

// // works
// export interface WorkItem {
//   id: string;
//   publishedAt: string;
//   title: string;
//   category: {
//     categoryId: string;
//     label: string;
//   };
//   workType: {
//     workTypeId: string;
//     label: string;
//   }[];
//   scope: string;
//   mvImages: {
//     url: string;
//     height: number;
//     width: number;
//   }[];
//   startDate: string;
//   endDate: string;
//   skill: string[];
//   content: string;
//   url: string;
// }
