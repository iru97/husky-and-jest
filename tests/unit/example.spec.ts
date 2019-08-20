import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  let component: any;

  const keywords = ['Git', 'Hooks', 'Jest', 'Examples'];
  const msg = 'new message';

  beforeEach(() => {
    component = shallowMount(HelloWorld, {
      // Create a shallow instance of the component
      propsData: {
        msg
      },
      data() {
        return {
          keywords
        }
      }
    });
  });

  it('equals keywords to ["Git", "Hooks", "Jest", "Examples"]', () => {
    // Within cmp.vm, we can access all Vue instance methods
    expect(component.vm.keywords).toEqual(['Git', 'Hooks', 'Jest', 'Examples']);
  });
  
  it('renders props.msg when passed', () => {
    expect(component.text()).toMatch(msg);
  })
})
