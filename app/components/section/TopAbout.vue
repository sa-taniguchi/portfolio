<template>
	<section id="top-about" class="l-section-pt l-section-pb about">
		<div class="l-container">
			<div class="about-inner">
				<div class="about-image">
					<UiAppPicture
						src="/images/top/about-pc.webp"
						alt=""
						loading="lazy"
						width="863"
						height="864"
						:sources="[
							{
								srcset: '/images/top/about-sp.webp',
								type: 'image/webp',
								media: '(max-width: 767px)',
							},
						]"
					/>
				</div>
				<div class="about-aside">
					<dl class="about-box">
						<dt class="about-box-heading">
							経歴について
						</dt>
						<dd class="about-box-text">
							<span>職業訓練校でWEB制作について半年間学習後、株式会社メディワークスにて約3年半主にHTMLコーダーとして、HPやLP制作、またデザイン制作の案件に携わってきました。</span>
							<span class="u-mt1">現在は株式会社FUTUREKにて2年超、フロントエンドエンジニアとして、WEBアプリケーションにも案件の領域を増やしています。</span>
						</dd>
					</dl>
					<dl class="about-box">
						<dt class="about-box-heading">
							FEとしての取り組み
						</dt>
						<dd class="about-box-text">
							<span>これまでの使用技術や作業の進め方に捉われず、触ったことのないライブラリや技術にもチャレンジ・積極的に習得・キャッチアップすることを心掛けております。</span>
							<span class="u-mt1">またチーム内外でコミュニケーションを取りながら建設的に作業を進めることが好きで、それぞれのポジションから意見を出し合いより良い成果物になることを目標としています。</span>
							<span class="u-mt1">粘り強く対応すること、また運用や保守を考えた作業を心掛けております。</span>
						</dd>
					</dl>
					<dl class="about-box">
						<dt class="about-box-heading">
							趣味や興味など
						</dt>
						<dd class="about-box-text">
							<span>大阪に生まれ30年間、現在も大阪在住です。<br>今後は新たな環境も視野に入れております。</span>
							<span class="u-mt1">サウナ・ハイキング・ジム・バレーボール・飲酒・読書・Netflixなどサブスク配信の視聴・昭和レコード集め。</span>
							<span class="u-mt1">インドアとアウトドアが混在していて正体不明ですが、なんでも興味を持ってみようと思っています！</span>
						</dd>
					</dl>
					<dl class="about-box">
						<dt class="about-box-heading">
							メッセージ
						</dt>
						<dd class="about-box-text">
							<span>現在、新たな環境でさらに技術を磨き、エンジニアとしてより大きな課題に挑戦するため転職活動を行っております。</span>
							<span class="u-mt1">これまでの領域に加えてWebアプリケーションや大規模なサイトにも携わっていきたいです。</span>
							<span class="u-mt1">どうぞよろしくお願いいたします!</span>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.about{
  background-color: rgb(var(--black01));
}

.about-inner{
  gap: math.div(100vw, $designBaseSp);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @include mq("pc"){
    flex-direction: row;
    gap: math.div(100vw, $designBasePc);
  }
}

.about-image{
  width: 100%;
  @include mq("pc"){
    position: sticky;
    top: 25vh;
    width: 45%;
  }
}

.about-aside{
  display: flex;
  flex-direction: column;
  gap: math.div(80vw, $designBaseSp);
  @include mq("pc"){
    width: 55%;
    gap: math.div(200vw, $designBasePc);
  }
}

.about-box-heading{
  font-weight: 700;
  letter-spacing: .06em;
  color: rgb(var(--blue01));
  display: inline-block;
  background: linear-gradient(
    to right,
    rgb(var(--blue01)),rgb(var(--blue02)),rgb(var(--blue03))
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: gradientMove 10s linear infinite;
  font-size: math.div(31vw, $designBaseSp);
  margin-bottom: math.div(30vw, $designBaseSp);
  line-height: 100%;
  @include mq("pc"){
    font-size: math.div(32vw, $designBasePc);
    margin-bottom: math.div(40vw, $designBasePc);
  }

  @keyframes gradientMove {
    0% { background-position: 0 0; }
    50% {background-position: 100% 100%}
    100% { background-position: 0 0; }
  }
}

.about-box-text{
  color: rgb(var(--white01));
  font-weight: 400;
  letter-spacing: .06em;
  font-size: math.div(14vw, $designBaseSp);
  @include mq("pc"){
    font-size: math.div(14vw, $designBasePc);
    line-height: 180%;
  }
}
</style>
