<script setup lang="ts">



import type { Work } from "~/types/blog"

const { params }  = useRoute();


const { data } = await useMicroCMSGetListDetail<Work>({
    endpoint: "work",
    contentId: Array.isArray(params.id) ? params.id[0] : params.id,
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
