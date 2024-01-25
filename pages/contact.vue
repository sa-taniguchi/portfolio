
<script setup lang="ts">
import { ref } from 'vue'
import { formSchema, nameSchema, emailSchema, telSchema, textareaSchema } from '../schema/user'

const name = ref('')
const email = ref('')
const tel = ref('')
const textarea = ref('')
const isValidSubmitBtn = ref(true)

const isNameValid = ref(true)
const isEmailValid = ref(true)
const isTelValid = ref(true)
const isTextareaValid = ref(true)

// エラー文言
const requiredErrorMsg:string = "必須入力項目です"
const emailErrorMsg:string = "メールアドレスを入力してください"
const telErrorMsg:string = "電話番号の形式で入力してください"



const validateName = () => {
    const res = nameSchema.safeParse(name.value)
    isNameValid.value = res.success
    allValidateCheck();
}

const validateEmail = () => {
    const res = emailSchema.safeParse(email.value)
    isEmailValid.value = res.success
    allValidateCheck();
}

const validateTel = () => {
    const res = telSchema.safeParse(tel.value)
    isTelValid.value = res.success
    allValidateCheck();
}

const validateTextarea = () => {
    const res = textareaSchema.safeParse(textarea.value)
    isTextareaValid.value = res.success
    allValidateCheck();
}

const allValidateCheck = () => {
    const result = formSchema.safeParse({
        name: name.value,
        email: email.value,
        tel: tel.value,
        textarea: textarea.value
    })

    if (result.success){
        isValidSubmitBtn.value = false
    } else {
        isValidSubmitBtn.value = true
    }
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
                                <input type="text" @blur="validateName" v-model="name" name="name" id="form-name" class="is-half">
                                <p>例）山田太郎</p>
                                <template
                                    v-if="!isNameValid"
                                    >
                                    <p 
                                        class="is-errored"
                                    >
                                        {{ requiredErrorMsg }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-email">メールアドレス</label></dt>
                            <dd>
                                <input type="email" @blur="validateEmail" v-model="email" name="email" id="form-email" class="is-half">
                                <p>例）portfolio@mail.com</p>
                                <template
                                    v-if="!isEmailValid"
                                    >
                                    <p
                                        class="is-errored"
                                    >
                                        {{ emailErrorMsg }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="non-required">任意</span><label for="form-tel">電話番号</label></dt>
                            <dd>
                                <input type="tel" @blur="validateTel" v-model="tel" name="tel" id="form-tel" class="is-half">
                                <p>例）07001234567(*ハイフンなしでご記入ください)</p>
                                <template
                                    v-if="!isTelValid"
                                    >
                                    <p
                                        class="is-errored"
                                    >
                                        {{ telErrorMsg }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-textarea">お問い合わせ内容</label></dt>
                            <dd>
                                <textarea name="textarea" id="form-textarea" @blur="validateTextarea" v-model="textarea"></textarea>
                                <p>お問い合わせ内容をお書き下さい。</p>
                                <template
                                    v-if="!isTextareaValid"
                                    >
                                    <p
                                        class="is-errored"
                                    >
                                        {{ requiredErrorMsg }}
                                    </p>
                                </template>
                            </dd>
                        </dl>
                        <div data-netlify-recaptcha="true" class="mb3"></div>
                        <div class="btn_wrapper"><button type="submit" class="btn" :disabled=isValidSubmitBtn>送信する</button></div>
                    </form>
                </div>
            </section>
        </article>
    </main>
</template>

