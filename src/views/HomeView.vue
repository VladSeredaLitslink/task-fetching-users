<template>
  <section class="home">
    <h1>Users</h1>
    <div class="users-control">
      <label for="filter">Filter by name</label>
      <input
        placeholder="Enter name for filter users"
        id="filter"
        v-model="filter"
      />
      <label for="sort">Select limit for show users</label>
      <select v-model="sort" id="sort">
        <option v-for="(item, idx) in sorts" :key="idx" :value="item">
          {{ item }}
        </option>
      </select>
      <label for="limit">Select limit for show users</label>
      <select v-model="limit" id="limit">
        <option v-for="(item, idx) in limits" :key="idx" :value="item">
          {{ item }}
        </option>
      </select>
      <MultiSelect
        :options="allowFields"
        label="Choose field(s) what you want to see"
        placeholder="Search field"
        :value="fields"
        @handlerSelect="onSelect"
      />
    </div>
    <Loader v-if="isLoading" />
    <div class="users-wrap" v-else-if="users.length">
      <Card v-for="user in users" :key="user.id" :user="user" />
    </div>
    <span v-else>No results</span>
  </section>
</template>

<script>
import Loader from "@/components/Loader";
import Card from "@/components/UserCard";
import MultiSelect from "@/components/Multiselect";
import controlUser from "@/mixins/controlUser";

export default {
  name: "HomeView",
  components: { MultiSelect, Card, Loader },
  mixins: [controlUser],
};
</script>
<style lang="scss" scoped>
.users {
  &-control {
    display: flex;
    flex-direction: column;
  }
  &-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
