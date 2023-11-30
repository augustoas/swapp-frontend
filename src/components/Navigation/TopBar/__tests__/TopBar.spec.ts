import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import TopBar from "@/components/Navigation/TopBar/TopBar.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("TopBar.vue", () => {
  let wrapper;
  let router;
  let store;
  let actions;

  beforeEach(() => {
    router = new VueRouter();
    actions = {
      // Mock your Vuex actions if needed
    };
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state: {
            authenticated: true, // or false depending on what you want to test
          },
          actions,
        },
      },
    });

    wrapper = shallowMount(TopBar, {
      localVue,
      store,
      router,
    });
  });

  it("navigates to home when logo is clicked", async () => {
    const logo = wrapper.find(".top-bar__logo img");
    await logo.trigger("click");

    // Replace '/' with the actual path you are expecting
    expect(wrapper.vm.$route.path).toBe("/");
  });
});
