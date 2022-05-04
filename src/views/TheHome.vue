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
      <multi-select
        :options="allowFields"
        label="Choose field(s) what you want to see"
        placeholder="Search field"
        :value="fields"
        @handlerSelect="onSelect"
      />
    </div>
    <the-loader v-if="isLoading" />
    <table v-else-if="mutatedUsers.length">
      <tr>
        <th v-for="(field, idx) in fields" :key="idx">{{ field.name }}</th>
        <th>actions</th>
      </tr>
      <tr v-for="user in mutatedUsers" :key="user.id">
        <td v-for="(field, idx) in fields" :key="idx">
          <img
            v-if="field.code === 'avatar'"
            :src="user[field.code]"
            alt="avatar"
          />
          <span v-else>{{ user[field.code] }}</span>
        </td>
        <td><button @click="moveToUserView(user.id)">Detail</button></td>
      </tr>
    </table>
    <span v-else>No results</span>
  </section>
</template>

<script>
import TheLoader from "../components/base/TheLoader";
import MultiSelect from "../components/MultiSelect";
import { fetchUsers } from "../store/index";

export default {
  name: "TheHome",
  components: { MultiSelect, TheLoader },
  data: () => ({
    allowFields: [
      {
        name: "name",
        code: "name",
      },
      {
        name: "avatar",
        code: "avatar",
      },
      {
        name: "address",
        code: "adress",
      },
      {
        name: "birthday",
        code: "dateOfBirth",
      },
      {
        name: "phone",
        code: "phoneNumber",
      },
    ],
    fields: [
      {
        name: "name",
        code: "name",
      },
      {
        name: "birthday",
        code: "dateOfBirth",
      },
      {
        name: "address",
        code: "adress",
      },
    ],
    limits: [5, 10, 15, 20, "all"],
    sorts: ["by name", "by address", "by birthday", "none"],
    isLoading: false,
    limit: null,
    sort: "none",
    filter: "",
    users: [],
    mutatedUsers: [],
  }),
  watch: {
    limit() {
      this.generateData();
    },
    filter() {
      this.generateData();
    },
    sort() {
      this.generateData();
    },
  },
  async mounted() {
    if (!this.users.length) {
      await this.fetch();
      this.generateData();
    }
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      await fetchUsers()
        .then((res) => {
          this.users = res;
          this.limit = this.users.length;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    generateData() {
      if (!this.fields.length) {
        this.mutatedUsers = [];
        return;
      }
      const limit = this.limit === "all" ? this.users.length - 1 : this.limit;
      let usersCustomized = this.users.slice(0, limit);
      if (this.filter) {
        usersCustomized = usersCustomized.filter((user) =>
          user.name.includes(this.filter)
        );
      }
      switch (this.sort) {
        case "by name" || "by address": {
          usersCustomized = usersCustomized.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        }
        case "by birthday": {
          usersCustomized = usersCustomized.sort(
            (a, b) =>
              new Date(a.dateOfBirth).getMilliseconds() -
              new Date(b.dateOfBirth).getMilliseconds
          );
          break;
        }
      }
      this.mutatedUsers = usersCustomized.map((user) => {
        const usersCustom = {};
        this.fields.forEach(({ code }) => {
          if (code === "dateOfBirth") {
            usersCustom[code] = new Date(user[code]).toDateString();
          } else {
            usersCustom[code] = user[code];
          }
        });
        usersCustom.id = user.id;
        return usersCustom;
      });
    },
    onSelect(value) {
      this.fields = value;
      this.generateData();
    },
    moveToUserView(id) {
      this.$router.push({ name: "UserView", params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
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
