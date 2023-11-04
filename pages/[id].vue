<script setup>



// import type { Work } from "~/types/blog"

// const { params }  = useRoute();


// const { data } = await useMicroCMSGetListDetail<Work>({
//     endpoint: "work",
//     contentId: Array.isArray(params.id) ? params.id[0] : params.id,
// });

const route = useRoute();

const { data } = await useFetch(`/work/${route}`, {
  baseURL: "https://myportfolio2107.microcms.io/api/v1",
  headers: {
    "X-MICROCMS-API-KEY": "XRcvtRPav49DOJO8XrKsPXW20SeLA3Pza0W9",
  },
});


</script>


<template>
    <Header />
    <main class="main">
        <section>
            <div class="lg-container">
                <div class="subpage_fv">
                    <h2>
                        WORKS
                        <span>制作実績</span>
                    </h2>
                </div>

                <div v-if="data">

                    <p>
                        <NuxtPicture 
                            provider="imgix" 
                            :src="data.img?.url"
                            alt=""
                        />
                    </p>
                    <h3>{{ data.title }}</h3>
                    <p>{{ data.txt }}</p>
                </div>

                <div class="btn_wrapper"><NuxtLink to="/#top-work" class="btn">戻る</NuxtLink></div>
            </div>
        </section>
    </main>
</template>
