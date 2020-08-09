<template>
    <ul class="ops">
        <li class="ops__item ops__item--search">
            <div @click.stop.prevent="searchDropdownVisible = true" class="searchbox">
                <div class="searchbox-input">
                    <i class="searchbox-input__ico searchbox-input__ico--search"></i>
                    <input
                        class="searchbox-input__input"
                        :class="{'searchbox-input__input--large': searchDropdownVisible}"
                        v-model.trim="searchText"
                        :placeholder="placeholder"
                        @focus="placeholder='请输入你要搜索的关键字'"
                        @blur="placeholder='搜索'"
                        @input="handleSearch"
                        @keydown="onSearchKeyDown"
                    />

                    <transition name="dropdown-slide2">
                        <ul v-if="searchText.length && searchDropdownVisible" ref="searchUl" class="searchbox-dropdown">
                            <li
                                class="searchbox-dropdown__item"
                                :class="{'searchbox-dropdown__item--active': searchResultActiveIndex===index}"
                                v-for="(page, index) in searchResults"
                                :key="index"
                                @click="onPageClick(page)"
                            >
                                <a
                                    href="javascript:;"
                                    v-html="$options.filters.highlight(page[pageTitleKey], searchText)"
                                ></a>
                            </li>

                            <li
                                class="searchbox-dropdown__noresult"
                                v-if="searchText.length && !searchResults.length"
                            >没有对应的页面</li>
                        </ul>
                    </transition>
                </div>
            </div>
        </li>
        <li class="ops__item ops__item--fullscreen" @click="fullcreen">
            <i class="fullcreenIcon fullcreenIcon--full" v-if="!isFullScreen" title="全屏"></i>
            <i class="fullcreenIcon fullcreenIcon--exit" v-if="isFullScreen" title="退出全屏"></i>
        </li>
        <li class="ops__item ops__item--username" @mouseleave="logoutDropdownVisible=false">
            <a class="ops__itemTxt" href="javascript:;" @mouseover="logoutDropdownVisible=true">{{ username }}</a>

            <transition name="dropdown-slide">
                <div class="logout-dropdown" v-if="logoutDropdownVisible">
                    <a class="logout-dropdown__item" href="javascript:;" @click="logout">退出</a>
                </div>
            </transition>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'LsTopMenuSearch',
    props: {
        menus: {
            type: Array,
            default: () => []
        },
        pageTitleKey: {
            type: String,
            default: 'name'
        },
        pagePathKey: {
            type: String,
            default: 'path'
        },
        username: String
    },
    data() {
        return {
            placeholder: '搜索',
            searchText: '',
            searchResults: [],
            searchDropdownVisible: false,
            searchResultActiveIndex: 0,
            logoutDropdownVisible: false,
            isFullScreen: false
        };
    },
    created() {
        document.body.addEventListener('click', () => {
            this.searchDropdownVisible = false;
            this.$forceUpdate();
        });
    },
    methods: {
        handleSearch() {
            if (!this.searchText) {
                return;
            }
            this.searchResults = [];
            this.searchResultActiveIndex = 0;
            this.menus.forEach(subMenu => {
                (subMenu.children || []).forEach(page => {
                    if ((page[this.pageTitleKey] || '').indexOf(this.searchText) !== -1) {
                        this.searchResults.push(page);
                    }
                });
            });
        },
        onSearchKeyDown(e) {
            if ([13, 38, 40].indexOf(e.keyCode) === -1 || !this.searchText || !this.$refs.searchUl) {
                return;
            }

            try {
                const ul = this.$refs.searchUl;
                if (!ul && !this.searchResults.length) {
                    return;
                }
                if (!this.searchResultActiveIndex && this.searchResultActiveIndex !== 0) {
                    this.searchResultActiveIndex = 0;
                    return;
                }
                const total = ul.childElementCount;
                if (e.keyCode === 38) {
                    this.searchResultActiveIndex =
                        this.searchResultActiveIndex === 0 ? 0 : this.searchResultActiveIndex - 1;
                    const li = ul.children[this.searchResultActiveIndex];
                    if (li) {
                        li.scrollIntoViewIfNeeded();
                    }
                } else if (e.keyCode === 40) {
                    this.searchResultActiveIndex =
                        this.searchResultActiveIndex >= total - 1
                            ? this.searchResultActiveIndex
                            : this.searchResultActiveIndex + 1;
                    const li = ul.children[this.searchResultActiveIndex];
                    if (li) {
                        li.scrollIntoViewIfNeeded();
                    }
                } else if (e.keyCode === 13) {
                    const page = this.searchResults[this.searchResultActiveIndex];
                    this.$emit('page-change', page);
                }
            } catch (e) {
                // eslint-disable-next-line
                console.error(e);
            }
        },
        onPageClick(page) {
            this.$emit('page-change', page);
        },
        fullcreen() {
            this.isFullScreen = !this.isFullScreen;

            if (this.isFullScreen) {
                const el = document.documentElement;
                const rfs = el.requestFullscreen;

                rfs.call(el);
            } else {
                document.exitFullscreen();
            }
        },
        logout() {
            this.$emit('logout');
        }
    },
    filters: {
        highlight(text, searchText) {
            return text.replace(searchText, `<span class="searchbox-dropdown__highlight">${searchText}</span>`);
        }
    }
};
</script>

<style scoped lang="scss">
@import '~@/assets/style/mixins/index.scss';

@include b(ops) {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    height: 100%;
    line-height: 48px;
    list-style: none;
    text-align: left;

    @include e(itemTxt) {
        box-sizing: border-box;
        display: block;
        padding: 0 25px 0 15px;
        width: 100%;
        height: 100%;
        color: #fff;
        text-decoration: none;
    }

    @include e(item) {
        position: relative;
        box-sizing: border-box;
        position: relative;
        float: left;
        height: 48px;
        color: #fff;

        @include m(search) {
            margin-right: 10px;
        }

        @include m(fullscreen) {
            display: flex;
            align-items: center;
            margin: 0 13px;
            margin-left: 0;
            cursor: pointer;
        }

        @include m(username) {
            display: flex;
            align-items: center;
            line-height: 48px;

            &:before {
                content: '';
                position: absolute;
                width: 1px;
                height: 14px;
                top: 16px;
                left: 0px;
                background-color: #666;
            }

            &:after {
                position: absolute;
                right: 6px;
                top: 21px;
                width: 0;
                height: 0;
                content: '';
                margin-bottom: -1px;
                border: 6px dashed transparent;
                border-top-style: solid;
                border-top-color: #fff;
                font-size: 0;
            }
        }
    }
}

@include b(fullcreenIcon) {
    display: inline-block;
    width: 14px;
    height: 14px;

    @include m(full) {
        background: url(https://haitao.nos.netease.com/d736d6d4-b5f0-4084-bf4e-ecddbf2b9a30_200_200.svg);
        background-size: contain;
    }

    @include m(exit) {
        background: url(https://haitao.nos.netease.com/4947c991-5650-4e39-9195-867da0b519bf_200_200.svg);
        background-size: contain;
    }
}

@include b(searchbox) {
    box-sizing: border-box;
    padding-left: 12px;
}

@include b(searchbox-input) {
    @include e(input) {
        width: 120px;
        box-sizing: border-box;
        height: 100%;
        padding: 5px;
        padding-left: 20px;
        border: none;
        font-size: 12px;
        color: #fff;
        background: #383e4d;
        -webkit-appearance: none;
        outline: none;
        transition: all 0.4s cubic-bezier(0.11393, 0.8644, 0.14684, 1);

        @include m(large) {
            width: 300px;
        }
    }

    @include e(ico) {
        position: absolute;
        width: 14px;
        height: 14px;

        @include m(search) {
            top: 16px;
            right: 20px;
            background: url(https://haitao.nos.netease.com/35c46d61-fa8a-40c1-8122-7f32bf58555f_200_200.svg);
            background-size: contain;
        }
    }
}

@include b(searchbox-dropdown) {
    position: relative;
    z-index: 1500;
    padding: 20px 0;
    font-size: 12px;
    background: #383e4d;
    margin-top: 8px;
    max-height: 200px;
    overflow: auto;
    transition: transform 0.2s ease-in-out;
    transform-origin: top;

    @include e(item) {
        line-height: 32px;
        cursor: pointer;

        @include m(active) {
            background-color: rgba(124, 132, 142, 0.1);
            color: #00a4ff;
        }

        a {
            box-sizing: border-box;
            padding: 0 20px;
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
            text-decoration: none;

            &:hover {
                background-color: rgba(124, 132, 142, 0.1);
                color: #00a4ff;
            }
        }
    }

    @include e(noresult) {
        text-align: center;
    }
}

@include b(logout-dropdown) {
    box-sizing: border-box;
    position: absolute;
    z-index: 1500;
    top: 100%;
    right: 0;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 0.2s;
    transform-origin: top;

    &:hover {
        background: #f5f5f6;
    }

    @include e(item) {
        font-size: 12px;
        text-decoration: none;
    }
}

/* transitions */
.dropdown-slide-enter,
.dropdown-slide-leave-to {
    transform: scaleY(0);
}
.dropdown-slide2-enter {
    transform: scaleY(0);
}
.dropdown-slide2-leave-to {
    display: none;
}
.searchbox-dropdown /deep/ .searchbox-dropdown__highlight {
    color: #00c4c0;
}
</style>