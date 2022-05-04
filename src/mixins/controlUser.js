import { mapGetters } from "vuex";
import moment from "moment";

export default {
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
    limit: 15,
    sort: "none",
    filter: "",
  }),
  computed: {
    ...mapGetters("user", ["getUsers"]),
    users: {
      get() {
        return this.init();
      },
      set() {
        return this.init();
      },
    },
  },
  watch: {
    limit() {
      this.init();
    },
    filter() {
      this.init();
    },
  },
  mounted() {
    if (!this.getUsers.length) {
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      await this.$store.dispatch("user/fetchUsers").finally(() => {
        this.isLoading = false;
      });
    },
    init() {
      if (!this.fields.length) {
        return [];
      }
      const limit =
        this.limit === "all" ? this.getUsers.length - 1 : this.limit;
      let users = this.getUsers.slice(0, limit);
      if (this.filter) {
        users = users.filter((user) => user.name.includes(this.filter));
      }
      switch (this.sort) {
        case "by name" || "by address": {
          users = users.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }
        case "by birthday": {
          users = users.sort(
            (a, b) => moment(a.dateOfBirth) - moment(b.dateOfBirth)
          );
          break;
        }
      }
      return users.map((user) => {
        const usersCustom = {};
        this.fields.forEach(({ code }) => {
          usersCustom[code] = user[code];
        });
        usersCustom.id = user.id;
        return usersCustom;
      });
    },
    onSelect(value) {
      this.fields = value;
      this.users = "update";
    },
  },
};
