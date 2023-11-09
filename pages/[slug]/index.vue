<script setup>

const route = useRoute();
const slug = route.params.slug;
const ctx = useRuntimeConfig();

const { data : work } = await useFetch(`/work/${slug}`, {
baseURL: ctx.public.baseUrl,
  headers: {
    "X-MICROCMS-API-KEY": ctx.public.apiKey,
  },
});


onMounted(()=>{
    
    const wrapCharSpan = function(str){
        return [...str].map(char => `<span>${char}</span>`).join('');
        }
        const targets = document.querySelectorAll('.js-span-wrap-text');
        targets.forEach( (target) => {
        target.innerHTML = wrapCharSpan(target.textContent);
    })

     // // スクロール検知(画面に入ったらクラス付与 && 外す)
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
    <main id="work">
        <section>
            <div class="lg-container">
                <div class="subpage_fv">
                    <h2 class="js-span-wrap-text js-io">WORKS</h2>
                    <span class="js-io">制作実績</span>
                </div>
            </div>
            <div class="lg-container">
                <p class="work_detail_img">
                    <NuxtPicture 
                        provider="imgix" 
                        :src="work.img.url"
                        alt=""
                        format="webp"
                    />
                </p>
            </div>
            <div class="md-container">
                <h3 class="work_headline"><span>{{ work.title }}</span></h3>
                <div class="mb2">
                    <h4 class="work_detail_ttl">担当</h4>
                    <div>
                        <span
                            class="work_detail_skill"
                            v-for="(part, p_index) in work.parts"
                            :key="p_index"
                        >
                        {{ part.parts }}
                        </span>
                    </div>
                </div>
                <div class="mb2">
                    <h4 class="work_detail_ttl">使用スキル</h4>
                    <div>
                        <span
                            class="work_detail_skill"
                            v-for="(skill,s_index) in work.skills"
                            :key="s_index"
                        >
                            {{ skill.skills }}
                        </span>
                    </div>
                </div>
                <div class="mb2">
                    <h4 class="work_detail_ttl">制作について</h4>
                    <div v-html="work.body" class="work_body"></div>
                </div>
                <p v-if="work.url" class="work_detail_url"><span>website:</span><NuxtLink :to="work.url" target="_blank">{{ work.url }}<img src="~/public/img/common/link.svg" alt="" class="work_url_link"></NuxtLink></p>
                <div class="btn_wrapper"><NuxtLink to="/#top-work" class="btn work_btn">戻る</NuxtLink></div>
            </div>
        </section>
    </main>
</template>
