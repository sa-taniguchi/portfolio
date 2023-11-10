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


    //ハンバーガーメニュー全般

    const mediaQueryList = window.matchMedia('(min-width: 996px)');

    const html = document.documentElement;
    const hmbg = document.getElementById('js-header-hmbg');
    const headerNav = document.getElementById('js-header-nav');
    const headerNavLinks = document.querySelectorAll('.header_nav_list li a');


    const listener = (event) => {
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
    let scrollpos;//スクロールの位置を入れる場所 
    hmbg.addEventListener('click',function(){
        this.classList.toggle('is-show');
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
        // hmbg.setAttribute('aria-hidden', false);
        // hmbg.setAttribute('aria-expanded', true);
        html.classList.remove('is-menuOpen');
        })
    }
    // /*ハンバーガーメニュー
    const header = document.getElementById('header');
    header.classList.add('is-load');
});
    // import { useField } from 'vee-validate';
    // import * as yup from 'yup';

    // const schema = yup.object({
    // name: yup
    //     .string()
    //     .required("この項目は必須です")
    //     .min(8, "８文字以上で入力してください"),
    // email: yup
    //     .string()
    //     .required("この項目は必須です")
    //     .email("メールアドレスの形式で入力してください"),
    // });

    // const { errors } = useForm({
    // validationSchema: schema,
    // });

    // const { value: name } = useField('name');
    // const { value: email } = useField('email');

</script>

<template>
    <!-- <Header /> -->
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
                                <input type="text" name="name" id="form-name" class="is-half" required>
                                <p>例）山田太郎</p>
                                <!-- <p>{{ erros.name }}</p> -->
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-email">メールアドレス</label></dt>
                            <dd>
                                <input type="email" name="email" id="form-email" class="is-half" required >
                                <p>例）portfolio@mail.com</p>
                                <!-- <p>{{ errors.email }}</p> -->
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="non-required">任意</span><label for="form-tel">電話番号</label></dt>
                            <dd>
                                <input type="tel" name="tel" id="form-tel" class="is-half">
                                <p>例）07001234567(*ハイフンなしでご記入ください)</p>
                            </dd>
                        </dl>
                        <dl class="form_box">
                            <dt><span class="required">必須</span><label for="form-textarea">お問い合わせ内容</label></dt>
                            <dd>
                                <!-- <p v-if="errors.textarea">{{ errors.textarea }}</p> -->
                                <textarea name="textarea"  id="form-textarea" required></textarea>
                                <p>お問い合わせ内容をお書き下さい。</p>
                            </dd>
                        </dl>
                        <div data-netlify-recaptcha="true"></div>

                        <div class="btn_wrapper"><button type="submit" class="btn">送信する</button></div>

                        
                    </form>
                </div>
            </section>
        </article>
    </main>
</template>

