<script lang="ts" setup>
const scrollText: string = 'SCROLL DOWN '; // 文字数調整（14文字）
const chars = (scrollText + scrollText).split('');
const totalChars = chars.length;
const anglePerChar = 360 / totalChars;
</script>

<template>
	<div class="scroll-wrapper">
		<ClientOnly>
			<div class="circle-text">
				<span
					v-for="(char, i) in chars"
					:key="i"
					:style="{ '--angle': `${i * anglePerChar}deg` }"
				>
					{{ char }}
				</span>
			</div>
		</ClientOnly>
		<div class="arrow" />
	</div>
</template>

<style lang="scss" scoped>
.scroll-wrapper {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: min(170px,math.div(120vw, $designBaseSp));
  aspect-ratio: 1 / 1;
  // ★ 親のサイズを基準にするための設定
  container-type: size;

  @include mq("pc") {
    width: math.div(120vw, $designBasePc);
  }
}

.circle-text {
  position: absolute;
  inset: 0;
  animation: rotate 20s linear infinite;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    color: rgb(var(--white01));
    line-height: 1;
    font-size: min(14px,math.div(10vw, $designBaseSp));

    transform:
      translate(-50%, -50%)
      rotate(var(--angle))
      translateY(-42cqw);

    @include mq("pc") {
      font-size: math.div(10vw, $designBasePc);
    }
  }
}

.arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(20px, math.div(15vw, $designBaseSp));
  height: min(20px, math.div(15vw, $designBaseSp));
  border-left: 1px solid rgb(var(--white01));
  border-bottom: 1px solid rgb(var(--white01));
  transform: translate(-50%, -50%) rotate(-45deg);

  @include mq("pc") {
    width: math.div(15vw, $designBasePc);
    height: math.div(15vw, $designBasePc);
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
</style>
