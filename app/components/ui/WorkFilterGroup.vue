<script setup lang="ts">
interface Item {
	id: string;
	label: string;
}

defineProps<{
	title: string;
	items: Item[];
	selectedIds: string[];
	isType?: boolean;
}>();

const emit = defineEmits<{
	(e: 'toggle', id: string): void;
}>();
</script>

<template>
	<dl>
		<dt class="work-filter-title">
			{{ title }}
		</dt>
		<dd class="work-filter-button-wrapper">
			<button
				v-for="item in items"
				:key="item.id"
				type="button"
				class="work-filter-button"
				:class="{ 'is-active': selectedIds.includes(item.id), 'is-type': isType }"
				@click="emit('toggle', item.id)"
			>
				<span class="work-filter-text">{{ item.label }}</span>
			</button>
		</dd>
	</dl>
</template>

<style lang="scss" scoped>
.work-filter-title{
  font-weight: 700;
  color: rgb(var(--black01));
  line-height: 100%;
  font-size: math.div(14vw, $designBaseSp);
  margin-bottom: math.div(15vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(14vw, $designBasePc);
    margin-bottom: math.div(15vw, $designBasePc);
  }
}

.work-filter-button-wrapper{
  display: flex;
  flex-wrap: wrap;
  gap: math.div(10vw, $designBaseSp);
  @include mq("pc"){
    gap: math.div(10vw, $designBasePc);
  }
}

.work-filter-button{
  border: 1px solid rgb(var(--blue03));
  color: rgb(var(--blue03));
  background-color: rgb(var(--white01));
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .3s, color .3s;
  padding: 0 math.div(10vw, $designBaseSp);
  border-radius: math.div(15vw, $designBaseSp);
  min-width: math.div(60vw, $designBaseSp);
  @include mq("pc"){
    padding: 0 math.div(10vw, $designBasePc);
    min-width: math.div(60vw, $designBasePc);
    border-radius: math.div(15vw, $designBasePc);
  }
  @include mq("hover"){
    &:hover{
      background-color: rgb(var(--blue03));
      color: rgb(var(--white01));
    }
  }
  &.is-active{
    background-color: rgb(var(--blue03));
    color: rgb(var(--white01));
  }
}

.work-filter-text{
  line-height: 210%;
  font-size: math.div(12vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(12vw, $designBasePc);
    color: inherit;
    font-weight: 500;
  }
}
</style>
