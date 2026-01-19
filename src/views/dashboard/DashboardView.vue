<template>
  <CContainer class="p-0">
    <CRow>
      <CCol :md="4" :sm="12" class="pr-0 d-flex flex-column">
        <CCard class="flex-fill">
          <CCardHeader>
            <CRow class="align-items-center">
              <CCol :md="8">
                <h6 class="card-title mb-0">주가데이터 상승률 TOP 10</h6>
                <div class="small text-body-secondary">{{ currentDateStr }}</div>
              </CCol>
              <CCol :md="4" class="align-items-center">
                <CLink class="small text-body-secondary">상세보기</CLink>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <!-- <DashboardStockList /> -->
          </CCardBody>
        </CCard>

        <CCard class="mt-3 flex-fill">
          <CCardHeader>
            <CRow class="align-items-center">
              <CCol :md="8">
                <h6 class="card-title mb-0">즐겨찾기 주식</h6>
              </CCol>
              <CCol :md="4">
                <CLink class="small text-body-secondary">상세보기</CLink>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <!-- <DashboardFavoriteList /> -->
          </CCardBody>
        </CCard>
      </CCol>

      <CCol :md="8" :sm="12">
        <CCard>
          <CCardHeader class="p-2 px-3">
            <CRow class="align-items-center">
              <CCol :md="5">
                <h5 class="pt-2 card-title">주가 분석 추이</h5>
              </CCol>
              <CCol :md="7" class="d-none d-md-block">
                <!-- 
                <CButton color="primary" class="float-end">
                  <CIcon icon="cil-cloud-download" />
                </CButton> 
                -->
                <CButtonGroup
                  class="float-end"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <CButton color="secondary" variant="outline">Day</CButton>
                  <CButton color="secondary" variant="outline" active>Month</CButton>
                  <CButton color="secondary" variant="outline">Year</CButton>
                </CButtonGroup>
              </CCol>
            </CRow>
          </CCardHeader>
          
          <CCardBody>
            <DashboardMainChart class="main-chart-size" />
          </CCardBody>
              
          <CCardFooter>
            <CRow
              :xs="{ cols: 1, gutter: 4 }"
              :sm="{ cols: 1 }"
              :lg="{ cols: 3 }"
              :xl="{ cols: 3 }"
              class="mb-2 text-center"
            >
              <!---->
              <CCol>
                <div class="text-body-secondary">Visits</div>
                <div class="fw-semibold text-truncate">29.703 Users (40%)</div>
                <CProgress class="mt-2" color="success" thin :precision="1" :value="40" />
              </CCol>
              <CCol>
                <div class="text-body-secondary">Unique</div>
                <div class="fw-semibold text-truncate">24.093 Users (20%)</div>
                <CProgress class="mt-2" color="info" thin :precision="1" :value="20" />
              </CCol>
              <CCol>
                <div class="text-body-secondary">Pageviews</div>
                <div class="fw-semibold text-truncate">78.706 Views (60%)</div>
                <CProgress class="mt-2" color="warning" thin :precision="1" :value="60" />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>

    <hr/>
    
    <CRow 
      :xs="{ cols: 1, gutter: 4 }"
      :sm="{ cols: 1 }"
      :lg="{ cols: 3 }"
      :xl="{ cols: 3 }"
      class="mb-3"
    >
      <CCol>
        <CCard class="main-footer-card">
          
        </CCard>
      </CCol>

      <CCol>
        <CCard class="main-footer-card">
          
        </CCard>
      </CCol>

      <CCol>
        <CCard class="main-footer-card">
          
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script setup>
import { reactive } from 'vue';
import dayjs from 'dayjs';
import { getDayKor } from '@/util/dateUtil'
import { CCardBody, CCardFooter, CCardHeader, CLink, CRow } from '@coreui/vue';
import DashboardMainChart from '@/components/dashboard/DashboardMainChart.vue';
import DashboardStockList from '@/components/dashboard/DashboardStockList.vue';
import DashboardFavoriteList from '@/components/dashboard/DashboardFavoriteList.vue';

const currentDate = dayjs()
const currentDay = getDayKor(currentDate.day())

const currentDateStr = reactive(`${currentDate.format('YYYY-MM-DD')} (${currentDay})`)


</script>

<style lang="scss" scoped>
.main-chart-size {
  height: 350px;
  max-height: 350px;
  margin-top: 10px;
}
.main-footer-card {
  height: 220px;
}
</style>