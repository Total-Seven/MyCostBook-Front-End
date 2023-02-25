<script setup>
import topBar from '@/components/topBar.vue';
import homeBanner from './cpns/homeBanner.vue';
import mybook from './cpns/mybook.vue'
import infos from './cpns/infos.vue'
// import tabbar from '../cpns/Tabbar.vue'
import planList from './cpns/planList.vue';

/**
* var
*/
const books = [
    {
        id: 1,
        name: 'Default',
        book_type: 0,
        img: 'default.svg',
        style: { bottom: '10px', width: '130px', height: '120px' }
    },
    {
        id: 2,
        name: 'Family',
        book_type: 1,
        img: 'work.svg',
        style: { bottom: '18px', width: '115px', height: '100px' }

    },
    {
        id: 3,
        name: 'Trip',
        book_type: 3,
        img: 'sleep.svg',
        style: { bottom: '28px', right: '3px', width: '115px', height: '120px' }

    },
    {
        id: 4,
        name: 'Baby',
        book_type: 4,
        img: 'Amazing.svg',
        style: { bottom: '28px', right: '3px', width: '130px', height: '120px' }

    },
    {
        id: 12,
        name: 'School',
        book_type: 2,
        img: 'happy.svg',
        style: { bottom: '20px', right: '3px', width: '120px', height: '105px' }

    }
]
const total_infos = {
    surplus: {
        net: 123,
        expense: 1230,
        income: 1353,
    },
    SaveMoney: 777,
    budget: 1500,
}
/**
* function
*/
</script>

<template>
    <div class="LedgerHome">
        <topBar />
        <homeBanner />
        <infos :total_infos="total_infos" />
        <mybook :books="books" />
        <!-- <tabbar class="tabbar"></tabbar> -->
        <planList />
</div>
</template>

<style lang="less" scoped>
.LedgerHome {
    position: relative;
    font-family: Inter;
    color: #cdcdcd;
    height: 100vh;
    overflow-y: auto;
    margin-bottom: 100px;

}
</style>