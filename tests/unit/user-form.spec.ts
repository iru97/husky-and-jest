import { shallowMount } from '@vue/test-utils'
import UserForm from '@/components/Form.vue'
import UserModel from '@/models/UserModel';

describe('UserForm.vue', () => {
  let component: any;

  beforeEach(() => {
    component = shallowMount(UserForm, {
      data() {
        return {
          user: {} as UserModel
        }
      }
    });
  });

  it('mounted without error message', () => {
    expect(component.find('.error').exists()).toBe(false);
  });

  it('renders error message', () => {
    component.find("[type='submit']").trigger('click');
    expect(component.find('.error').exists()).toBe(true);
  });

  it('renders success message', () => {
    const inputName = component.find('#name');
    inputName.element.value = 'Iru';
    inputName.trigger('input');

    const inputSurname = component.find('#surname');
    inputSurname.element.value = 'Hernández';
    inputSurname.trigger('input');

    const inputAge = component.find('#age');
    inputAge.element.value = 21;
    inputAge.trigger('input');

    component.find("[type='submit']").trigger('click');
    expect(component.find('.success').exists()).toBe(true);

  });
})
