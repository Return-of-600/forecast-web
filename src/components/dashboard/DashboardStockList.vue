<template>
  <CTable align="middle" class="mb-0 border" hover responsive>
    <!-- 
    <CTableHead class="text-nowrap">
      <CTableRow>
        <CTableHeaderCell class="bg-body-secondary text-center">
          <CIcon name="cil-people" />
        </CTableHeaderCell>
        <CTableHeaderCell class="bg-body-secondary"> User </CTableHeaderCell>
        <CTableHeaderCell class="bg-body-secondary text-center">
          Country
        </CTableHeaderCell>
        <CTableHeaderCell class="bg-body-secondary"> Usage </CTableHeaderCell>
        <CTableHeaderCell class="bg-body-secondary text-center">
          Payment Method
        </CTableHeaderCell>
        <CTableHeaderCell class="bg-body-secondary"> Activity </CTableHeaderCell>
      </CTableRow>
    </CTableHead> -->
    <CTableBody>
      <CTableRow v-for="items in tableExample" :key="items.name">
        <CTableDataCell class="text-center">
          <CAvatar size="md" :src="items.avatar.src" :status="items.avatar.status" />
        </CTableDataCell>
        <CTableDataCell>
          <div>{{ items.user.name }}</div>
          <div class="small text-body-secondary text-nowrap">
            <span>{{ items.user.new ? 'New' : 'Recurring' }}</span> |
            {{ items.user.registered }}
          </div>
        </CTableDataCell>
        <CTableDataCell class="text-center">
          <CIcon size="xl" :name="items.country.flag" :title="items.country.name" />
        </CTableDataCell>
        <CTableDataCell>
          <div class="d-flex justify-content-between align-itemss-baseline">
            <div class="fw-semibold">{{ items.usage.value }}%</div>
            <div class="text-nowrap text-body-secondary small ms-3">
              {{ items.usage.period }}
            </div>
          </div>
          <CProgress thin :color="items.usage.color" :value="items.usage.value" />
        </CTableDataCell>
        <CTableDataCell class="text-center">
          <CIcon size="xl" :name="items.payment.icon" />
        </CTableDataCell>
        <CTableDataCell>
          <div class="small text-body-secondary">Last login</div>
          <div class="fw-semibold text-nowrap">
            {{ items.activity }}
          </div>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script setup>
defineProps({
  items: {
    type: Array,

  }
})
</script>

<style lang="scss" scoped>

</style>