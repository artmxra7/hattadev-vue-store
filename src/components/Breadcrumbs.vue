<template>
  <div
    class="holder"
    v-if="$breadcrumbs.length > 1"
  >
    <nav class="breadcrumbs">
      <ul class="breadcrumbs__list">
        <li
          class="breadcrumbs__item"
          :key="index"
          v-for="(crumb, index) in $breadcrumbs"
        >
          <router-link
            class="breadcrumbs__link"
            :to="linkProp(crumb)"
          >
            {{$t(`breadcrumbs.${crumb.meta.breadcrumb}`)}}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  registerComponent: true,
  methods: {
    linkProp(crumb) {
      if (crumb.name || (crumb.handler && crumb.handler.name)) {
        return {
          name: crumb.name || crumb.handler.name,
          params: this.$route.params,
        };
      }

      return {
        path: (crumb.handler && crumb.handler.fullPath)
          ? crumb.handler.fullPath
          : crumb.path,
        params: this.$route.params,
      };
    },
  },
  filters: {},
};
</script>
