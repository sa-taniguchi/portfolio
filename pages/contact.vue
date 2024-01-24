
<script setup lang="ts">
import {useCreateUserValidationName, useCreateUserValidationEmail, useCreateUserValidationTel, useCreateUserValidationTextarea} from '@/composables/useUserValidation'

const { errorMessagesName, validateName } = useCreateUserValidationName();
const { errorMessagesEmail, validateEmail } = useCreateUserValidationEmail();
const { errorMessagesTel, validateTel } = useCreateUserValidationTel();
const { errorMessagesTextarea, validateTextarea } = useCreateUserValidationTextarea();

const name = ref('')
const email = ref('')
const tel = ref('')
const textarea = ref('')

const inputCheckName = () => {
    validateName({
        name: name.value,
    });
}
const inputCheckEmail = () => {
    validateEmail({
        email: email.value,
    });
}
const inputCheckTel = () => {
    validateTel({
        tel: tel.value,
    });
}
const inputCheckTextarea = () => {
    validateTextarea({
        textarea: textarea.value,
    });
}


onMounted(()=>{
    useHead({
        script: [
            {
                src: 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js',
                tagPosition: 'bodyClose'
            },
            {
                src: 'common.js',
                tagPosition: 'bodyClose'
            },
        ],
        title: 'お問い合わせ｜'
    })
    
    const wrapCharSpan = function(str: any){
        return [...str].map(char => `<span>${char}</span>`).join('');
        }
        const targets = document.querySelectorAll('.js-span-wrap-text');
        targets.forEach( (target) => {
        target.innerHTML = wrapCharSpan(target.textContent);
    })

    let scrollCheck = document.querySelectorAll('.js-io');
    const cb = function(entries:any){
        entries.forEach((entry: any) => {
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


        //ハンバーガーメニュー全般

        const mediaQueryList = window.matchMedia('(min-width: 996px)');

        const html:any = document.documentElement;
        const hmbg:any = document.getElementById('js-header-hmbg');
        const headerNav:any = document.getElementById('js-header-nav');
        const headerNavLinks:any = document.querySelectorAll('.header_nav_list li a');


        const listener = (event:any) => {
            // リサイズ時に行う処理
            if (event.matches) {
                headerNav.classList.remove('is-show');
                headerNav.setAttribute('aria-hidden', false);
                hmbg.classList.remove('is-show');
                hmbg.setAttribute('aria-hidden', true);
                // hmbg.setAttribute('aria-expanded', false);
                html.classList.remove('is-menuOpen');
            } else {
                headerNav.setAttribute('aria-hidden', true);
                hmbg.setAttribute('aria-hidden', false);
                // hmbg.setAttribute('aria-expanded', true);
            }
        };
        mediaQueryList.addEventListener("change", listener);

        // 初期化処理
        listener(mediaQueryList);


        // ハンバーガーメニューの開閉
        let scrollpos:any;//スクロールの位置を入れる場所 
        hmbg.addEventListener('click',function(){
            hmbg.classList.toggle('is-show');
            headerNav.classList.toggle('is-show');
            // if(hmbg.getAttribute('aria-expanded') === 'false' && (this.classList.contains('is-show')) ){
            if(headerNav.getAttribute('aria-hidden') === 'true'){
            // hmbg.setAttribute('aria-expanded', false);
            headerNav.setAttribute('aria-hidden', false);
            scrollpos = window.scrollY;
            document.body.style.top = scrollpos * -1 + 'px';
            html.classList.add('is-menuOpen');
            } 
            else {
            // hmbg.setAttribute('aria-expanded', true);
            headerNav.setAttribute('aria-hidden', true);
            html.classList.remove('is-menuOpen');
            window.scrollTo(0, scrollpos);
            }
        });


        for(let i=0; i<headerNavLinks.length;i++){
            headerNavLinks[i].addEventListener('click',()=>{
            headerNav.classList.remove('is-show');
            headerNav.setAttribute('aria-hidden', true);
            hmbg.classList.remove('is-show');
            html.classList.remove('is-menuOpen');
            })
        }







});

</script>


<template>
    <Header />
    <main id="contact">
        <article>
            <section>
                <div class="md-container">
                    <div class="subpage_fv">
                        <h2 class="js-span-wrap-text js-io">Contact</h2>
                        <span class="js-io">お問い合わせ</span>
                    </div>
                    <p>お気軽にお問い合わせください。</p>
                    <form 
                    name="contact" 
                    action="/complete" 
                    method="POST"
                    data-netlify-recaptcha="true"
                    data-netlify="true" 
                    class="form_wrapper">
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-name">お名前</label></dt>
                            <dd>
                                <input type="text" @blur="inputCheckName" v-model="name" name="name" id="form-name" class="is-half">
                                <p>例）山田太郎</p>
                                <template
                                    v-if="errorMessagesName && errorMessagesName.flatten().fieldErrors.name?.length"
                                    >
                                    <p
                                        v-for="(error, i) in errorMessagesName.flatten().fieldErrors.name"
                                        :key="i"
                                        class="is-red"
                                    >
                                        {{ error }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-email">メールアドレス</label></dt>
                            <dd>
                                <input type="email" @blur="inputCheckEmail" v-model="email" name="email" id="form-email" class="is-half">
                                <p>例）portfolio@mail.com</p>
                                <template
                                    v-if="errorMessagesEmail && errorMessagesEmail.flatten().fieldErrors.email?.length"
                                    >
                                    <p
                                        v-for="(error, i) in errorMessagesEmail.flatten().fieldErrors.email"
                                        :key="i"
                                        class="is-red"
                                    >
                                        {{ error }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="non-required">任意</span><label for="form-tel">電話番号</label></dt>
                            <dd>
                                <input type="tel" @blur="inputCheckTel" v-model="tel" name="tel" id="form-tel" class="is-half">
                                <p>例）07001234567(*ハイフンなしでご記入ください)</p>
                                <template
                                    v-if="errorMessagesTel && errorMessagesTel.flatten().fieldErrors.tel?.length"
                                    >
                                    <p
                                        v-for="(error, i) in errorMessagesTel.flatten().fieldErrors.tel"
                                        :key="i"
                                        class="is-red"
                                    >
                                        {{ error }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-textarea">お問い合わせ内容</label></dt>
                            <dd>
                                <textarea name="textarea" id="form-textarea" @blur="inputCheckTextarea" v-model="textarea"></textarea>
                                <p>お問い合わせ内容をお書き下さい。</p>
                                <template
                                    v-if="errorMessagesTextarea && errorMessagesTextarea.flatten().fieldErrors.textarea?.length"
                                    >
                                    <p
                                        v-for="(error, i) in errorMessagesTextarea.flatten().fieldErrors.textarea"
                                        :key="i"
                                        class="is-red"
                                    >
                                        {{ error }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <div data-netlify-recaptcha="true" class="mb3"></div>

                        <div class="btn_wrapper"><button type="submit" class="btn">送信する</button></div>
                    </form>
                </div>
            </section>
        </article>
    </main>
</template>

