<script setup lang="ts">
interface Props {
	item: {
		id: string;
		title: string;
		mvImages: {
			url: string | null;
			width: number | null;
			height: number | null;
		}[];
		category: {
			categoryId: string;
			label: string;
		};
		workType: {
			workTypeId: string;
			label: string;
		}[];
	};
	isDisabled?: boolean;
}

defineProps<Props>();
</script>

<template>
	<div v-if="item" class="work-card">
		<NuxtLink :class="['work-link', { 'is-disabled': isDisabled }]" :to="`/works/${item.id}/`">
			<UiAppPicture
				:src="`${item.mvImages[0]?.url}?w=1000&fm=webp&q=75`"
				:alt="item.title"
				decoding="async"
				class="work-image"
				:width="`${item.mvImages[0]?.width}`"
				:height="`${item.mvImages[0]?.height}`"
				:sources="[
					{
						srcset: `${item.mvImages[0]?.url}?w=600&fm=avif&q=75`,
						type: 'image/avif',
					},
				]"
			/>
			<span class="work-item-title">{{ item.title }}</span>
		</NuxtLink>
		<div class="work-item-hash-container">
			<NuxtLink :class="['work-link-hash', { 'is-disabled': isDisabled }]" :to="`/works/?categoryId=${item.category.categoryId}`">
				<span class="work-item-hash">#{{ item.category.label }}</span>
				<!-- <span class="work-item-hash">#{{ item.workType.label }}</span> -->
			</NuxtLink>
			<div
				v-for="type in item.workType"
				:key="type.workTypeId"
				class="work-hash-container"
			>
				<NuxtLink
					:class="['work-link-hash', { 'is-disabled': isDisabled }]"
					:to="`/works/?workTypeId=${type.workTypeId}`"
				>
					<span class="work-item-hash">#{{ type.label }}</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style lang='scss' scoped>
.work-link{
  display: flex;
  flex-direction: column;
  gap: math.div(15vw, $designBaseSp);
  color: rgb(var(--black01));
  @include mq("pc"){
    gap: math.div(15vw, $designBasePc);
  }
  @include mq("hover"){
    &:hover:not(.is-disabled){
      .work-item-title{
        text-decoration: underline;
      }
      .work-image :deep(img){
        animation: rotateImage 0.7s ease-out forwards;
      }
    }
  }

  &.is-disabled{
    pointer-events: none;
  }
}

.work-link-hash{
  display: inline-flex;
  gap: math.div(5vw, $designBaseSp) math.div(10vw, $designBaseSp);
  color: rgb(var(--black01));
  transition: opacity .3s;
  @include mq("pc"){
    gap: math.div(5vw, $designBasePc) math.div(10vw, $designBasePc);
  }
  @include mq("hover"){
    &:hover:not(.is-disabled){
      text-decoration: underline;
    }
  }
}

@keyframes rotateImage {
  0% {
    rotate: 0deg;
  }
  33.33% {
    rotate: 15deg;
  }
  66.66% {
    rotate: -15deg;
  }
  100% {
    rotate: 0deg;
  }
}

.work-image{
  border: 1px solid rgb(var(--black01));
  :deep(img){
    display: block;
    object-fit: contain;
    aspect-ratio: 1/1;
    padding: math.div(10vw, $designBaseSp);
    @include mq("pc"){
      padding: math.div(15vw, $designBasePc);
    }
  }
}

.work-item-text-wrapper{
  display: block;
}

.work-item-title{
  font-weight: 700;
  color: rgb(var(--black01));
  width: 100%;
  line-height: 130%;
  letter-spacing: .04em;
  font-size: math.div(16vw, $designBaseSp);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: math.div(10vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(21vw, $designBasePc);
    margin-bottom: math.div(15vw, $designBasePc);
  }
}

.work-item-hash-container{
  display: inline-flex;
  align-items: center;
  gap: math.div(10vw, $designBaseSp);
  @include mq("pc"){
    gap: math.div(10vw, $designBasePc);
  }
}

.work-item-hash{
  display: inline-block;
  color: rgb(var(--black01));
  opacity: .6;
  font-size: math.div(12vw, $designBaseSp);
  letter-spacing: .06em;
  line-height: 100%;
  @include mq("pc"){
    font-size: math.div(14vw, $designBasePc);
  }
  &.is-disabled{
    pointer-events: none;
  }
  >span{
    display: inline-block;
  }
}

.work-hash-container{
  display: inline-block;
}

// .work-item-text{
//   white-space: pre-wrap;
//   @include mq("pc"){
//     line-height: 180%;
//     font-size: math.div(16vw, $designBasePc);
//   }
// }
</style>
