// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)
    // console.log('i18n----translatedTitle', translatedTitle);

    return translatedTitle
  }
  // console.log('i18n----title', title);
  return title
}
