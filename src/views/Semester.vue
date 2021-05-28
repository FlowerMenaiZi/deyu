<template>
  <div id="semester" :style="{height:WHeight+'px'}">
    <div class="content">
      <select name="semester" id="selSemester" @change="getSemester($event)">
        <option value="" selected>请选择学期</option>
        <option value="2021-2022t">2021-2022上学期</option>
        <option value="2020-2021l">2020-2021下学期</option>
        <option value="2020-2021t">2020-2021上学期</option>
      </select>
      <button id="btn" @click="sureSemester">确定</button>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, inject,ref} from 'vue'
  import router from "@/router";

  export default defineComponent({
    name: "Semester",
    setup() {
      const WHeight = inject('endHeight')
      const semester = ref('')
      const getSemester = (e:any) =>{
        semester.value = e.target.value
      }
      const sureSemester = () =>{
        if (semester.value !== '2021-2022t'){
          location.href="http://119.29.185.52:8810";
          return false
        }else {
          if (semester.value){
            localStorage.setItem('semester',semester.value)
            router.push('/home')
          }else{
            return false
          }
        }
      }

      return{
        WHeight,
        getSemester,
        sureSemester,
        semester
      }
    }
  })
</script>

<style scoped>
  #semester {
    position: relative;
  }

  #semester .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #selSemester{
    width: 220px;
    height: 50px;
    font-size: 20px;
    border: none;
    text-align: center;
    text-align-last: center;
    outline: none;
    margin-right: 20px;
    background: radial-gradient(circle at center center, rgba(25, 25, 112, 0), rgba(25, 25, 112, 0)),
    linear-gradient(rgba(112, 169, 238, 0.62), rgba(77, 134, 220, 0.6)) left top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right bottom,
    linear-gradient(rgba(56, 144, 184, 0.60), rgba(56, 144, 184, 0.60)) top,
    linear-gradient(rgba(26, 87, 130, 0.60), rgba(26, 87, 130, 0.60)) bottom,
    linear-gradient(rgba(56, 144, 184, 0.60), rgba(219, 240, 255, 0.80), rgba(26, 87, 130, 0.60)) left,
    linear-gradient(rgba(56, 144, 184, 0.60), rgba(219, 240, 255, 0.80), rgba(26, 87, 130, 0.60)) right;
    background-repeat: no-repeat;
    background-position: 1px 1px, 0px 0px, 0px 0px, 0px 100%, 0px 100%, 100% 0px, 100% 0px, 100% 100%, 100% 100%, 0px 0px, 0px 100%, 0px 100%, 100% 100%;
    background-size: calc(100% - 2px) calc(100% - 2px), 1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px, 100% 1px, 100% 1px, 1px 100%, 1px 100%;
  }
  #btn {
    z-index: 1;
    color: white;
    background: #40a9ff;
    outline: none;
    border: none;
    padding: 0.5em 1em;
    width: 80px;
    height: 40px;
  }

  #btn:hover {
    cursor: pointer;
    animation: jelly 0.5s;
  }
  @keyframes jelly {
    0%,
    100% {
      transform: scale(1, 1);
    }

    25%,
    75% {
      transform: scale(0.9, 1.1);
    }

    50% {
      transform: scale(1.1, 0.9);
    }
  }
</style>