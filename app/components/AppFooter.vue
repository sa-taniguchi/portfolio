<template>
	<footer class="footer">
		<!-- <div class="footer-logo">
			<img src="/images/common/logo.webp" alt="nishikawa">
		</div> -->
		<p class="footer-cp">
			&copy;TANIGUCHI SATOSHI PORTFOLIO.
		</p>
	</footer>
</template>

<style lang="scss" scoped>
	.footer{
		padding: math.div(200vw, $designBaseSp) 0 math.div(20vw, $designBaseSp);
    @include mq("pc"){
      padding: math.div(200vw, $designBasePc) 0 math.div(50vw, $designBasePc);
    }
	}

	.footer-logo{
		margin: 0 auto math.div(7vw, $designBaseSp);
		img{
			display: block;
			margin: 0 auto;
			width: math.div(100vw, $designBaseSp);
		}
	}

	.footer-cp{
		font-weight: 400;
		line-height: 180%;
		letter-spacing: .06em;
		text-align: center;
    font-size: min(10px,math.div(12vw, $designBaseSp));
    @include mq("pc"){
      font-size: min(10px,math.div(12vw, $designBasePc));
    }
	}
</style>
