<script setup lang="ts">
import { useWorkStore } from '~~/stores/work';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 使用するモジュールを配列に入れる

const modules = [Autoplay, Pagination];
const store = useWorkStore();
const { animateText } = useTextAnimation();
const titleAnime = useTemplateRef<HTMLElement>('titleAnime');
const workTitle: string = 'WORKS';

const { workList } = storeToRefs(store);
const work = computed(() => {
	return workList.value?.find(item => item.id === id) || null;
});

if (!store.works) {
	store.fetchWorks();
}

const route = useRoute();
const id = route.params.id as string; // URLの [id] 部分を取得

const currentUrl = computed(() => `${useRuntimeConfig().public.domain}${route.path}`);

const pageTitle = computed(() => work.value ? `${work.value.title} | 谷口聡のポートフォリオ` : '作品詳細 | 谷口聡のポートフォリオ');
const pageDescription = computed(() => {
	const desc = work.value?.content || '';
	return desc ? desc.substring(0, 100) : '作品詳細ページです。';
});

useSeoMeta({
	title: pageTitle,
	description: pageDescription,
	ogTitle: pageTitle,
	ogDescription: pageDescription,
	ogUrl: currentUrl,
	twitterTitle: pageTitle,
	twitterDescription: pageDescription,
});

onMounted(() => {
	animateText(titleAnime, workTitle, 1, 0.5);
});
</script>

<template>
	<article>
		<h2 class="work-title font-audio anime-textBorder-bk">
			<span ref="titleAnime">{{ workTitle }}</span>
		</h2>
		<section v-if="work && !store.pending" class="l-container">
			<div v-if="work.mvImages?.length" class="workDetail-mv u-sp-full-width">
				<template v-if="work.mvImages.length === 1">
					<UiAppPicture
						:src="`${work.mvImages[0]?.url}?w=1200&fm=webp&q=80`"
						:alt="work.title"
						:width="`${work.mvImages[0]?.width}`"
						:height="`${work.mvImages[0]?.height}`"
						fetchpriority="high"
						:sources="[
							{
								srcset: `${work.mvImages[0]?.url}?w=1200&fm=avif&q=80`,
								type: 'image/avif',
							},
						]"
					/>
				</template>

				<template v-else>
					<ClientOnly>
						<Swiper
							:modules="modules"
							:slides-per-view="1"
							:loop="true"
							:autoplay="{ delay: 5000 }"
							:pagination="{
								clickable: true,
								dynamicBullets: true,
								dynamicMainBullets: 1,
							}"
						>
							<SwiperSlide v-for="(img, index) in work.mvImages" :key="index">
								<UiAppPicture
									:src="`${img.url}?w=1200&fm=webp&q=80`"
									:alt="work.title"
									:width="`${img.width}`"
									:height="`${img.height}`"
									fetchpriority="high"
									:sources="[
										{
											srcset: `${img.url}?w=1200&fm=avif&q=80`,
											type: 'image/avif',
										},
									]"
								/>
							</SwiperSlide>
						</Swiper>
					</ClientOnly>
				</template>
			</div>
			<div class="workDetail-header">
				<div>
					<p class="workDetail-category">
						#{{ work.category.label }}
					</p>
					<h2 class="workDetail-title">
						{{ work.title }}
					</h2>
				</div>
				<div v-if="work.url">
					<a
						class="workDetail-link"
						:href="work.url"
						target="_blank"
						role="button"
					>
						<span class="font-audio">WEBSITE</span>
						<span class="workDetail-link-icon" />
					</a>
				</div>
			</div>

			<div class="workDetail-body">
				<dl class="workDetail-body-inner">
					<dt class="workDetail-body-title">
						制作・運用期間
					</dt>
					<dd class="workDetail-body-text">
						{{ work.startDate }} 〜 {{ work.endDate }}
					</dd>
				</dl>
				<dl class="workDetail-body-inner">
					<dt class="workDetail-body-title">
						担当スコープ
					</dt>
					<dd class="workDetail-body-text">
						{{ work.scope }}
					</dd>
				</dl>
				<dl class="workDetail-body-inner">
					<dt class="workDetail-body-title">
						使用スキル
					</dt>
					<dd class="workDetail-body-text">
						<ul class="workDetail-body-text-list">
							<li v-for="skillName in work.skill" :key="skillName">
								{{ skillName }}
							</li>
						</ul>
					</dd>
				</dl>
				<dl class="workDetail-body-inner">
					<dt class="workDetail-body-title">
						取り組み
					</dt>
					<dd class="workDetail-body-text">
						{{ work.content }}
					</dd>
				</dl>
			</div>

			<div class="workDetail-backButton">
				<UiBaseButton
					to="/works"
					label="一覧へ戻る"
					color="transparent"
				/>
			</div>
		</section>
		<section v-else-if="store.pending" class="l-container">
			<UiWorkDetailSkeleton />
		</section>
		<section v-else>
			<p>該当する記事がありません。</p>
			<div class="workDetail-backButton">
				<UiBaseButton
					to="/works"
					label="一覧へ戻る"
					color="transparent"
				/>
			</div>
		</section>
	</article>
</template>

<style lang="scss" scoped>
.work-title{
  font-size: math.div(70vw, $designBaseSp);
  margin: math.div(50vw, $designBaseSp) 0;
  @include mq("pc"){
    font-size: math.div(200vw, $designBasePc);
    margin: math.div(60vw, $designBasePc) 0;
  }
}
.workDetail-mv, .swiper{
  padding-bottom: math.div(30vw, $designBaseSp);
  height: math.div(300vw, $designBaseSp);
  max-height: math.div(300vw, $designBaseSp);

  :deep(picture){
    display: block;
    width: 100%;
    height: 100%;
  }
  :deep(img){
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @include mq("pc"){
    padding-bottom: math.div(60vw, $designBasePc);
    width: 100%;
    height: math.div(500vw, $designBasePc);
    max-height: math.div(500vw, $designBasePc);
  }
  :deep(.swiper-pagination-bullet){
    background: rgb(var(--blue03));
    // transition: width .5s, border-radius .3s;
    // transform-origin: left center;
  }

  :deep(.swiper-pagination-bullets-dynamic) {
  /* Swiperが計算する位置をリセットし、常に中央へ */
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 100% !important; /* 幅を広げてドットが隠れないようにする */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible; /* 端のドットが見切れないように */
  }

  // :deep(.swiper-pagination-bullet-active){
  //   border-radius: 5px;
  //   display: inline-block;
  //   // width: math.div(35vw, $designBaseSp);
  //   opacity: .7;
  //   background-size: 100% 100%;
  //   @include mq("pc"){
  //     // width: math.div(35vw, $designBasePc);
  //   }
  // }
}

.workDetail-header{
  display: flex;
  flex-direction: column;
  margin: 0 auto math.div(40vw, $designBaseSp);
  @include mq("pc"){
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 80%;
    margin: 0 auto math.div(40vw, $designBasePc);
    gap: 0 math.div(20vw, $designBaseSp);
  }
}

.workDetail-link{
  font-weight: 500;
  color: rgb(var(--black01));
  display: flex;
  align-items: center;
  font-size: math.div(18vw, $designBaseSp);
  text-decoration: underline;
  line-height: 270%;
  @include mq("pc"){
    line-height: 100%;
    font-size: math.div(21vw, $designBasePc);
  }
}

.workDetail-link-icon{
  display: block;
  position: relative;
  width: math.div(10vw, $designBaseSp);
  height: math.div(10vw, $designBaseSp);
  margin-left: math.div(12vw, $designBaseSp);
  @include mq("pc"){
    width: math.div(14vw, $designBasePc);
    height: math.div(14vw, $designBasePc);
    margin-left: math.div(12vw, $designBasePc);
  }
  &::before,&::after{
    content: '';
    position: absolute;
    display: inline-block;
  }
  &::before{
    border-top: 2px solid rgb(var(--black01));
    border-right: 2px solid rgb(var(--black01));
    top: 0;
    right: 0;
    width: math.div(10vw, $designBaseSp);
    height: math.div(10vw, $designBaseSp);
    @include mq("pc"){
      width: math.div(14vw, $designBasePc);
      height: math.div(14vw, $designBasePc);
    }
  }
  &::after{
    border-bottom: 2px solid rgb(var(--black01));
    border-left: 2px solid rgb(var(--black01));
    bottom: 0;
    left: 0;
    width: math.div(6vw, $designBaseSp);
    height: math.div(6vw, $designBaseSp);
    @include mq("pc"){
      width: math.div(9vw, $designBasePc);
      height: math.div(9vw, $designBasePc);
    }
  }

  .workDetail-link:hover &{
    @include mq("hover"){
      &::before{
        animation: externalLinkBefore .3s linear forwards;
      }
      &::after{
        animation: externalLinkAfter .3s linear forwards;
      }
    }
  }
}

@keyframes externalLinkBefore {
  0% {
    height: math.div(14vw, $designBasePc);
    opacity: 1;
    width: math.div(14vw, $designBasePc);
  }

  20% {
    height: math.div(14vw, $designBasePc);
    opacity: 0;
    width: math.div(14vw, $designBasePc);
  }

  25% {
    height: 0;
    opacity: 0;
    width:0
  }

  30% {
    height: 0;
    opacity: 1;
    width:0
  }

  to {
    height: math.div(14vw, $designBasePc);
    opacity: 1;
    width: math.div(14vw, $designBasePc);
  }
}

@keyframes externalLinkAfter {
  0% {
    height: math.div(9vw, $designBasePc);
    opacity: 1;
    width: math.div(9vw, $designBasePc);
  }

  20% {
    height: math.div(9vw, $designBasePc);
    opacity: 0;
    width: math.div(9vw, $designBasePc);
  }

  25% {
    height: 0;
    opacity: 0;
    width:0
  }

  30% {
    height: 0;
    opacity: 1;
    width:0
  }

  to {
    height: math.div(9vw, $designBasePc);
    opacity: 1;
    width: math.div(9vw, $designBasePc);
  }
}

.workDetail-category{
  display: block;
  line-height: 210%;
  font-size: math.div(14vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(14vw, $designBasePc);
    opacity: .6;
  }
}

.workDetail-title{
  font-size: math.div(24vw, $designBaseSp);
  line-height: 120%;
  text-wrap: wrap;
  @include mq("pc"){
    font-size: math.div(36vw, $designBasePc);
  }
}

.workDetail-date{
  line-height: 180%;
  font-size: math.div(16vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(20vw, $designBasePc);
  }
}

.workDetail-body{
  display: flex;
  flex-direction: column;
  margin: 0 auto math.div(60vw, $designBaseSp);
  gap: math.div(30vw, $designBaseSp);
  @include mq("pc"){
    max-width: 80%;
    gap: math.div(30vw, $designBasePc);
    margin: 0 auto math.div(140vw, $designBasePc);
  }
}

.workDetail-body-title{
  font-weight: 700;
  display: flex;
  align-items: center;
  font-size: math.div(16vw, $designBaseSp);
  margin-bottom: math.div(9vw, $designBaseSp);
  line-height: 100%;
  @include mq("pc"){
    margin-bottom: math.div(9vw, $designBasePc);
    font-size: math.div(16vw, $designBasePc);
  }
  &::before{
    content: "";
    display: inline-block;
    background: rgb(var(--blue03));
    line-height: 100%;
    vertical-align: middle;
    height: math.div(9vw, $designBaseSp);
    width: math.div(9vw, $designBaseSp);
    margin-right: math.div(9vw, $designBaseSp);
    @include mq("pc"){
      height: math.div(9vw, $designBasePc);
      width: math.div(9vw, $designBasePc);
      margin-right: math.div(9vw, $designBasePc);
    }
  }
}

.workDetail-body-text{
  font-size: math.div(16vw, $designBaseSp);
  line-height: 150%;
  white-space: pre-line;
  @include mq("pc"){
    font-size: math.div(16vw, $designBasePc);
  }
}

.workDetail-body-text-list{
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
  >li{
    &:not(:last-of-type)::after{
      content: ',';
    }
  }
}

.workDetail-backButton{
  display: flex;
  align-items: center;
  justify-content: center;
  width: math.div(270vw, $designBaseSp);
  margin: 0 auto;
  @include mq("pc"){
     width: math.div(270vw, $designBasePc);
  }
}
</style>
