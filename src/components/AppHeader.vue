<template>
  <CHeader position="sticky" :class="headerClassNames">
    <CContainer class="border-bottom px-4" fluid>
      <CHeaderToggler @click="sidebar.toggleVisible()" style="margin-inline-start: -14px">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="header-search">
        <CInputGroup class="d-flex">
          <CFormInput 
            v-model="userSearchInput" 
            type="search" 
            placeholder="검색어를 입력하세요." 
            class="search-input"
            @focus="searchInputFocused = true"
            @click="searchInputClickEvent"
          />
          <CButton color="primary" class="search-button">
            <CIcon icon="cil-search" />
          </CButton>
        </CInputGroup>

        <CCard v-if="searchInputFocused" class="search-panel">
          <CListGroup>
            <CListGroupItem 
              v-for="({ keyword }, index) in filterKeywords" 
              :index="`search-${index}`"
              as="a" 
              href="#"
            >
              {{ keyword }}
            </CListGroupItem>
          </CListGroup>
        </CCard>
      </CHeaderNav>
      
      <CHeaderNav class="ms-auto">
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon v-if="colorMode === 'dark'" icon="cil-moon" size="lg" />
            <CIcon v-else-if="colorMode === 'light'" icon="cil-sun" size="lg" />
            <CIcon v-else icon="cil-contrast" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="colorMode === 'light'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('light')"
            >
              <CIcon class="me-2" icon="cil-sun" size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'dark'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('dark')"
            >
              <CIcon class="me-2" icon="cil-moon" size="lg" /> Dark
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'auto'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('auto')"
            >
              <CIcon class="me-2" icon="cil-contrast" size="lg" /> Auto
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>

    <!-- 현재 접속 화면 경로 표시 -->
    <!-- 
    <CContainer class="px-4" style="height: 30px" fluid>
      <AppBreadcrumb />
    </CContainer>  
    -->
  </CHeader>
</template>


<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useColorModes } from '@coreui/vue'

import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppHeaderDropdownAccnt from '@/components/AppHeaderDropdownAccnt.vue'
import { useSidebarStore } from '@/stores/sidebar.js'
import CIcon from '@coreui/icons-vue'

const headerClassNames = ref('mb-4 p-0')
const { colorMode, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')
const sidebar = useSidebarStore()

onMounted(() => {
  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 0) {
      headerClassNames.value = 'mb-4 p-0 shadow-sm'
    } else {
      headerClassNames.value = 'mb-4 p-0'
    }
  })
})

const searchInputFocused = reactive(false)

const searchInputClickEvent = e => {
  console.log(e)
}

// 검색 기능 테스트를 위해 임시 구현.
const dummy = [
  { keyword: 'develop' },
  { keyword: 'deeplol' },
  { keyword: 'DEAR' },
  { keyword: 'Determine' },
  { keyword: 'degree' },
  { keyword: 'de 뜻' }
]

const userSearchInput = reactive('')

const filterKeywords = computed(() => {
  return dummy.filter(v => v.keyword.includes(userSearchInput))
})
</script>


<style lang="scss" scoped>
.header-search {
  position: absolute;
  left: 20%;
  width: 50%;

  .search-panel {
    position: absolute;
    top: 100%;
    z-index: 9999;
    width: 100%;
    margin-top: 0.24rem;
  }
}
</style>