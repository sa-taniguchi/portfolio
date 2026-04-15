<script setup lang="ts">
import { useWorkStore } from '~~/stores/work';
import { useSkillStore } from '~~/stores/skill';

const skillStore = useSkillStore();
const workStore = useWorkStore();

const SectionTopAbout = defineAsyncComponent(() => import('~/components/section/TopAbout.vue'));
const SectionTopSkill = defineAsyncComponent(() => import('~/components/section/TopSkill.vue'));
const SectionTopWorks = defineAsyncComponent(() => import('~/components/section/TopWorks.vue'));

onMounted(async () => {
	await Promise.all([
		!skillStore.skill ? skillStore.fetchSkill() : Promise.resolve(),
		!workStore.works ? workStore.fetchWorks() : Promise.resolve(),
	]);

	console.log('両方のデータ取得（またはスキップ）が完了しました');
});

definePageMeta({
	title: 'トップページ',
	description: 'フロントエンドエンジニア 谷口聡のポートフォリオサイトです。トップページでは自己紹介、スキル、作品を掲載しています。',
});
</script>

<template>
	<div>
		<SectionTopKv />
		<SectionTopAbout />
		<SectionTopSkill />
		<SectionTopWorks />
	</div>
</template>
