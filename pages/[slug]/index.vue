<script setup>

// import type { Work } from "~/types/blog"

// const { params }  = useRoute();

// const { data } = await useMicroCMSGetListDetail<Work>({
//     endpoint: "work",
//     contentId: Array.isArray(params.id) ? params.id[0] : params.id,
// });

const route = useRoute();
const slug = route.params.slug;
const ctx = useRuntimeConfig();

const { data : work } = await useFetch(`/work/${slug}`, {
baseURL: ctx.public.baseUrl,
  headers: {
    "X-MICROCMS-API-KEY": ctx.public.apiKey,
  },
});
</script>


<template>
    <Header />
    <main id="work">
        <section>
            <div class="lg-container">
                <div class="subpage_fv">
                    <h2>
                        WORKS
                        <span>制作実績</span>
                    </h2>
                </div>
            </div>
            <div class="lg-container">
                <p class="work_detail_img">
                    <NuxtPicture 
                        provider="imgix" 
                        :src="work.img.url"
                        alt=""
                    />
                </p>
            </div>
            <div class="md-container">
                <h3 class="work_headline"><span>{{ work.title }}</span></h3>
                <div class="mb2">
                    <h4 class="work_detail_ttl">担当</h4>
                    <div>{{ work.part }}</div>
                </div>
                <div class="mb2">
                    <h4 class="work_detail_ttl">使用スキル</h4>
                    <div>{{ work.skill }}</div>
                </div>
                <div class="mb2">
                    <h4 class="work_detail_ttl">制作について</h4>
                    <p>{{ work.txt }}</p>
                </div>
                <p class="work_detail_url"><span>website:</span><NuxtLink :to="work.url" target="_blank">{{ work.url }}<img src="~/public/img/common/link.svg" alt="" class="work_url_link"></NuxtLink></p>
                <div class="btn_wrapper"><NuxtLink to="/#top-work" class="btn work_btn">戻る</NuxtLink></div>
            </div>
        </section>
    </main>
</template>
