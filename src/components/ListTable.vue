<template>
    <CDataTable
      :loading="loading"
      class="list-table"
      :items="items"
      :fields="fields"
      :column-filter="showColumnFilter"
      :table-filter="showTableFilter"
      :items-per-page-select="showPagination"
      :items-per-page="itemPerPage"
      :hover="showHover"
      :dark="showDark"
      :outlined="showOutlined"
      :border="showBorder"
      :striped="showStriped"
      :sorter="showSorter"
      :pagination="showPagination"
      @row-clicked="handleRowClick"
    >
        <template #user="{item}">
            <td>
                <div class="user-avatar">
                    <Avatar
                        :size="30"
                        :src="item.user.url" 
                        :username="item.user.name" />
                    &nbsp;{{item.user.name}}
                </div>
            </td>
        </template>
        <template #strategy_followers="{item, index}">
            <td>
                <div class="action-box" :key="item.followerCount">
                    <div :class="{'action': true, 'selected': item.followers.includes(parseInt(loggedInUser.user_id))}">
                        {{item.followerCount}}
                        <span 
                            v-if="item.userId !== parseInt(loggedInUser.user_id)" 
                            v-c-tooltip="!item.followers.includes(parseInt(loggedInUser.user_id)) ? 'Follow this strategy':'You already followed this strategy'" 
                            @click="item.onFollow(index)">
                            <CIcon name="cil-user-follow" />
                        </span>
                        <span v-else>
                            <CIcon name="cil-user-follow" class="disabled" />
                        </span>
                    </div>
                </div>
            </td>
        </template>
      <template #actions="{item, index}">
        <td>
            <template  v-for="(aItem, aIndex) in item.actions">
                <CSwitch
                    v-if="aItem.type == 'switch'"
                    :key="aIndex"
                    shape='pill'
                    color="success"
                    class="mx-1"
                    :checked="item.isFollowed"
                    @update:checked="aItem.funcAction($event, index)"
                />
                <CButton
                    v-else-if="aItem.type === 'button'"
                    :key="aIndex"
                    shape="pill"
                    size="sm"
                    :color="aItem.color || 'success'"
                    class="mx-1"
                    @click="aItem.funcAction(index)"
                >
                    {{ aItem.label }}
                </CButton>
            </template>
        </td>
      </template>
      <template #strategy_info="{item}">
          <td>
              <span v-c-tooltip="{
                    content: item.description,
                    placement: 'top'
                }">
                <CIcon name="cil-settings" />
              </span>
          </td>
      </template>
    </CDataTable>
</template>

<script>    
    import { mapGetters } from 'vuex';

    import Avatar from '@/components/Avatar';

    export default {
        components: {
            Avatar
        },
        props: {
            items: {
                type: Array,
                default: () => []
            },
            fields: {
                type: Array,
                default: () => []
            },
            showColumnFilter: {
                type: Boolean,
                default: false
            },
            showTableFilter: {
                type: Boolean,
                default: true
            },
            itemPerPage: {
                type: Number,
                default: 15
            },
            showHover: {
                type: Boolean,
                default: true
            },
            showDark: {
                type: Boolean,
                default: false
            },
            showOutlined: {
                type: Boolean,
                default: true
            },
            showBorder: {
                type: Boolean,
                default: false
            },
            showStriped: {
                type: Boolean,
                default: false
            },
            showSorter: {
                type: Boolean,
                default: true
            },
            showPagination: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['loggedInUser'])
        },
        methods: {
            handleRowClick(item, index, columnName, event) {
                if(columnName !== 'actions')
                    this.$emit('row-clicked', index);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .list-table {
        /deep/ table {
            tr {
                cursor: pointer;
                &:hover {
                    td {
                        .user-avatar {
                            color: #39F;
                        }
                    }
                }
                td {
                    .user-avatar {
                        display: flex;
                        color: #321FDB;
                        font-weight: 500;
                        .vue-avatar--wrapper {
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
</style>