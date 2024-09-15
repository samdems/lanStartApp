import { defineStore } from 'pinia'
import { ref,watch} from 'vue'

export const useUserStore = defineStore('user', ()=>{

  const funnyNames = ref([
    'Silly',
    'Goofy',
    'Crazy',
    'Funny',
    'Wacky',
    'Zany',
    'Whacky',
    'Loony',
    'Nutty',
    'Kooky',
    'Bonkers',
    'Daft',
    'Mad',
    'Absurd',
    'Ridiculous',
  ]);


  const name = ref(localStorage.getItem('name') || funnyNames.value[Math.floor(Math.random() * funnyNames.value.length)]);

  const getName = () => {
    return name.value;
  }

  watch(name, (newName:string) => {
    localStorage.setItem('name',newName);
  })

  return {
    getName,
    name,
  }
});
