import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
	features: {
		stylistic: {
			semi: true,
			quotes: 'single',
			indent: 'tab',
		},
	},
}).override('nuxt/vue/rules', {
	rules: {
		'vue/max-attributes-per-line': ['error', { singleline: { max: 3 } }],
	},
});
