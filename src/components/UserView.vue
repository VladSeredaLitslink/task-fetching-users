<template>
  <section>
    <Loader v-if="isLoading" />
    <div v-else class="card">
      <h1>User view</h1>
      <div class="card-title">
        <h3>{{ user.name }}</h3>
      </div>
      <div class="card-body">
        <div class="card-body__img">
          <img
            v-show="user.avatar"
            :src="user.avatar"
            :alt="`avatar by ${user.name}`"
          />
        </div>
        <div class="card-body__description">
          <div v-show="user.adress">
            <b>Address: </b><span>{{ user.adress }}</span>
          </div>
          <div v-show="user.phoneNumber">
            <b>Phone: </b><span>{{ user.phoneNumber }}</span>
          </div>
          <div v-show="user.dateOfBirth">
            <b>Birthday: </b><span>{{ birthday }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader";

export default {
  name: "UserView",
  components: { Loader },
  data: () => ({
    user: {},
    isLoading: false,
  }),
  computed: {
    ...mapGetters("user", ["getUsers"]),
    birthday() {
      const birthday = this.user.dateOfBirth;
      return moment(birthday).format("Do MMM YYYY");
    },
  },
  async mounted() {
    if (!this.getUsers.length) {
      this.isLoading = true;
      await this.fetchUsers().finally(() => {
        this.isLoading = false;
      });
    }
    const id = this.$route.params.id;
    this.user = this.getUsers.find((user) => user.id === id);
  },
  methods: {
    ...mapActions("user", ["fetchUsers"]),
  },
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 14px;
  margin: 14px;

  &-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &__img {
      max-width: 200px;
      max-height: 200px;
      margin-right: 12px;

      img {
        border-radius: 4px;
      }
    }

    &__description {
      display: flex;
      flex-direction: column;
      align-items: baseline;
    }
  }

  img {
    max-width: 100%;
    width: auto;
    max-height: 100%;
    height: auto;
  }
}
</style>
