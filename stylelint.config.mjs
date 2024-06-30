export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-idiomatic-order',
  ],
  plugins: ['stylelint-prettier', 'stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [true, {
      "ignore": ["css-nesting"],
    }],
  },
}
