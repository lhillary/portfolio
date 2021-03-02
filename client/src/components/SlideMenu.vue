<template>
    <div class="lh-slide-menu-container" :class="[{ 'color-reverse': this.colorReverse }]">
        <div ref="sideNav" class="lh-slide-menu">
            <nav class="lh-item-list">
                <slot></slot>
            </nav>
            <span class="lh-cross-button cross-style" @click="closeMenu" :class="{ hidden: !crossIcon }">
                <lh-icon-button icon="mu-cancel" color-reverse></lh-icon-button>
            </span>
        </div>
        <div ref="lhMenuButton" class="lh-slide-menu-button" @click="openMenu" :class="{ hidden: !menuIcon }">
            <lh-icon-button icon="mu-menu"></lh-icon-button>
        </div>
    </div>
</template>

<script>

    import LhIconButton from './IconButton';

    export default {
        name: 'lh-slide-menu',
        data() {
            return {
            isSideBarOpen: false
            };
        },
        props: {
        isOpen: {
            type: Boolean,
            required: false
        },
        colorReverse: {
          type: Boolean,
          default: false
        },
        right: {
            type: Boolean,
            required: false
        },
        width: {
            type: [String],
            required: false,
            default: '300'
        },
        disableEsc: {
            type: Boolean,
            required: false
        },
        noOverlay: {
            type: Boolean,
            required: false
        },
        onStateChange: {
            type: Function,
            required: false
        },
        menuIcon: {
            type: Boolean,
            required: false,
            default: true
        },
        crossIcon: {
            type: Boolean,
            required: false,
            default: true
        },
        disableOutsideClick: {
            type: Boolean,
            required: false,
            default: false
        },
        closeOnNavigation: {
            type: Boolean,
            required: false,
            default: false
        }
      },
      methods: {
        openMenu() {
          this.$emit('openMenu');
          this.isSideBarOpen = true;

          if (!this.noOverlay) {
            document.body.classList.add('lh-overlay');
          }
          if (this.right) {
            this.$refs.sideNav.style.left = 'auto';
            this.$refs.sideNav.style.right = '0px';
          }
          this.$nextTick(function() {
            this.$refs.sideNav.style.width = this.width
              ? this.width + 'px'
              : '300px';
          });
        },

        closeMenu() {
          this.$emit('closeMenu');
          this.isSideBarOpen = false;
          document.body.classList.remove('lh-overlay');
          this.$refs.sideNav.style.width = '0px';
        },

        closeMenuOnEsc(e) {
          e = e || window.event;
          if (e.key === 'Escape' || e.keyCode === 27) {
            this.closeMenu();
          }
        },
        documentClick(e) {
          let element = this.$refs.lhMenuButton;
          let target = null;
          if (e && e.target) {
            target = e.target;
          }

          if (
            element &&
            element !== target &&
            !element.contains(target) &&
            !this.hasClass(target,'lh-slide-menu') &&
            this.isSideBarOpen &&
            !this.disableOutsideClick
          ) {
            this.closeMenu();
          } else if (
            element &&
            this.hasClass(target,'lh-slide-menu') &&
            this.isSideBarOpen &&
            this.closeOnNavigation
          ) {
            this.closeMenu();
          }
        },
        hasClass(element, className) {
          do {
            if (element.classList && element.classList.contains(className)) {
              return true;
            }
            element = element.parentNode;
          } while (element);
          return false;
        },
      },

      mounted() {
        if (!this.disableEsc) {
          document.addEventListener('keyup', this.closeMenuOnEsc);
        }
      },
      created: function() {
        document.addEventListener('click', this.documentClick);
      },
      destroyed: function() {
        document.removeEventListener('keyup', this.closeMenuOnEsc);
        document.removeEventListener('click', this.documentClick);
      },
      watch: {
        isOpen: {
          deep: true,
          immediate: true,
          handler(newValue, oldValue) {
            this.$nextTick(() => {
              if (!oldValue && newValue) {
                this.openMenu();
              }
              if (oldValue && !newValue) {
                this.closeMenu();
              }
            });
          }
        },
        right: {
          deep: true,
          immediate: true,
          handler(oldValue, newValue) {
            if (oldValue) {
              this.$nextTick(() => {
                this.$refs.lhMenuButton.style.left = 'auto';
                this.$refs.lhMenuButton.style.right = '36px';
                this.$refs.sideNav.style.left = 'auto';
                this.$refs.sideNav.style.right = '0px';
                document.querySelector('.lh-slide-menu-button').style.left = 'auto';
                document.querySelector('.lh-slide-menu-button').style.right = '36px';
                document.querySelector('.lh-slide-menu').style.left = 'auto';
                document.querySelector('.lh-slide-menu').style.right = '0px';
                document.querySelector('.cross-style').style.right='250px';
              });
            }
            if (newValue) {
              if (
                this.$refs.lhMenuButton.hasAttribute('style')
              ) {
                this.$refs.lhMenuButton.removeAttribute('style');
                this.$refs.sideNav.style.right = 'auto';
                document
                  .querySelector('.lh-slide-menu-button')
                  .removeAttribute('style');
                document.getElementById('sideNav').style.right = 'auto';
                document.querySelector('.cross-style').style.right='0px';
              }
            }
          }
        }
      },
      components: {
        LhIconButton
      }
    };
</script>

<style scoped lang="scss">

    @import "../assets/sass/mixins.scss";

    html {
      height: 100%;
    }

    .lh-slide-menu-button.hidden {
      display: none;
    }

    .line-style {
      position: absolute;
      height: 20%;
      left: 0;
      right: 0;
    }

    .cross-style {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
    }

    .lh-cross-button {
      height: 36px;
      width: 36px;
    }

    .lh-cross-button.hidden {
      display: none;
    }

    .lh-slide-menu {
      height: 100%;
      width: 0; 
      position: fixed;
      z-index: 1000; 
      top: 0;
      left: 0;
      background-color: var(--on-background-color);
      overflow-x: hidden; 
      padding-top: 60px; 
      transition: 0.5s; 
    }

    .lh-item-list {
      color: $white;
      margin-left: 10%;
      font-size: 16px;
    }

    .lh-item-list > * {
      display: flex;
      text-decoration: none;
      white-space: nowrap;
      font-weight: 600;
    }

    .lh-item-list > * > span {
      margin-left: 10px;
      color: var(--background-color);
    }

</style>

