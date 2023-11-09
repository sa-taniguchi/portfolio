<script setup>
onMounted(()=>{
    
    const wrapCharSpan = function(str){
        return [...str].map(char => `<span>${char}</span>`).join('');
        }
        const targets = document.querySelectorAll('.js-span-wrap-text');
        targets.forEach( (target) => {
        target.innerHTML = wrapCharSpan(target.textContent);
    })

    let scrollCheck = document.querySelectorAll('.js-io');
    const cb = function(entries){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('is-inview');
            } 
        });
    }
    
    const options = {
        threshold: .2
    }
    
    const io = new IntersectionObserver(cb,options);
    
    scrollCheck.forEach(v => {
        io.observe(v);
    });
});
</script>



<template>
    <Header />
    <main id="complete">
        <article>
            <section>
                <div class="lg-container">
                    <div class="subpage_fv">
                        <h2 class="js-span-wrap-text js-io">Contact</h2>
                        <span class="js-io">お問い合わせ</span>
                    </div>
                    <div class="complete_wrapper">
                        <h3 class="complete_ttl">お問い合わせが完了しました</h3>
                        <p>お問い合わせいただきありがとうございました。</p>
                        <p class="mb3">
                        折り返し、ご連絡いたしますので、
                        恐れ入りますが、しばらくお待ちください。
                        </p>
                        <div class="btn_wrapper"><nuxtLink to="/" role="button" class="btn">トップへ戻る</nuxtLink></div>
                    </div>
                </div>
            </section>
        </article>
    </main>
</template>