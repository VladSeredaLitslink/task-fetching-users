<template>
  <router-link :to="{ name: 'UserView', params: { id: user.id } }" class="card">
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
  </router-link>
</template>

<script>
import moment from "moment";

export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    birthday() {
      const birthday = this.user.dateOfBirth;
      return moment(birthday).format("Do MMM YYYY");
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 14px 14px 14px;
  margin: 14px;
  box-shadow: 0 0 10px rgb(0 0 0 / 7%);
  transition: all 0.3s ease;
  width: calc(50% - 56px);
  @media (max-width: 576px) {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 0 10px rgb(0 0 0 / 70%);
  }
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
