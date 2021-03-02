<template>
    <div class="lh-projects">
        <div class="lh-projects-buttons">
            <lh-button :active="currentFilter === 'All' ? true : false" @click="setFilter('All')">All Projects</lh-button>
            <lh-button :active="currentFilter === 'Dev' ? true : false" @click="setFilter('Dev')">Development</lh-button>
            <lh-button :active="currentFilter === 'UI' ? true : false" @click="setFilter('UI')">UI Design</lh-button>
            <lh-button :active="currentFilter === 'GD' ? true : false" @click="setFilter('GD')">Graphic Design</lh-button>
            <lh-button :active="currentFilter === 'Fun' ? true : false" @click="setFilter('Fun')">Funsies</lh-button>
        </div>
        <transition-group class="lh-projects-content-container" name="projects">
            <div class="lh-project-container" :key="project.title" v-for="project in projects">
                <div class="lh-project" v-if="currentFilter === project.category || currentFilter === 'All'" @click="openModal(project.id)">
                    <div class="lh-project-img">
                        <img :src="project.image" :alt="project.title" />
                    </div>
                    <div class="lh-project-info">
                        <h4>{{ project.title }}</h4>
                    </div>
                    <div class="overlay"></div>
                </div>
                <lh-modal no-ease :ref="project.id" :title="project.title" size="fullscreen" remove-footer>
                    <div class="project-popup-container">
                        <div class="project-popup-image-container" v-for="image in project.images" :key="image.src">
                            <div class="project-popup-image">
                                <img :src="image.src" :alt="project.title" />
                            </div>
                        </div>
                        <div class="project-popup-text-container" v-for="text in project.text" :key="text.para">
                            <p class="project-popup-paragraph">
                                {{ text.para }}
                            </p>
                        </div>
                    </div>
                </lh-modal>
            </div>
        </transition-group>
    </div>
</template>

<script>

    import LhButton from './Button'
    import LhModal from './Modal'

    export default {
        name: 'lh-projects',
        data() {
            return {
                currentFilter: 'All',
                projects: [
                    {
                        id: 'modal1',
                        title: 'Sciometrix.com',
                        image: require('../assets/img/scio-intro.png'),
                        images: [
                            { src: require('../assets/img/scio-intro.png') },
                            {src: require('../assets/img/scio-movie.gif')}
                        ],
                        category: 'Dev',
                        text: [
                            { para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget scelerisque nisl, non laoreet metus. Maecenas sit amet dui eget arcu bibendum mattis. Mauris elementum imperdiet arcu, quis pulvinar ex lobortis sed. Curabitur vel posuere magna. Aliquam tincidunt vulputate pharetra. Aliquam erat volutpat.' },
                            { para: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla scelerisque nisl eu purus lacinia pretium. Praesent vel nibh sed ante porttitor semper ac vel mauris. Phasellus fringilla id sem a volutpat.' }
                        ]
                    },{
                        id: 'modal2',
                        title: 'Smminsight.com',
                        image: require('../assets/img/smm-web-intro.jpg'),
                        images: [
                            { src: require('../assets/img/smm-web-intro.jpg') },
                            { src: require('../assets/img/smm-web.jpg') }
                        ],
                        category: 'Dev',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal6',
                        title: 'LoveBook CRM',
                        image: require('../assets/img/crm-dt.gif'),
                        images: [
                            { src: require('../assets/img/crm-dt.gif') },
                            { src: require('../assets/img/crm-mb.gif') }
                        ],
                        category: 'UI',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal7',
                        title: 'LoveBook.com',
                        image: require('../assets/img/lp-dt.gif'),
                        images: [
                            { src: require('../assets/img/lp-dt.gif') },
                            { src: require('../assets/img/lp-mb.gif') }
                        ],
                        category: 'UI',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal8',
                        title: 'Klein',
                        image: require('../assets/img/klein-intro.jpg'),
                        images: [
                            { src: require('../assets/img/klein-intro.jpg') },
                            { src: require('../assets/img/klein-web.png') }
                        ],
                        category: 'UI',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal9',
                        title: 'Your Wired Solutions',
                        image: require('../assets/img/yws-intro.jpg'),
                        images: [
                            { src: require('../assets/img/yws-intro.jpg') },
                            { src: require('../assets/img/yws-web.png') }
                        ],
                        category: 'UI',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal10',
                        title: 'SMM Design',
                        image: require('../assets/img/SMM_Folder.png'),
                        images: [
                            { src: require('../assets/img/SMM_Folder.png') },
                            { src: require('../assets/img/SMM_Stationery.png') }
                        ],
                        category: 'GD',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal11',
                        title: 'CPI',
                        image: require('../assets/img/cpi-intro-photo.jpg'),
                        images: [
                            { src: require('../assets/img/cpi-intro-photo.jpg') },
                            { src: require('../assets/img/cpi-page-photo1.jpg') }
                        ],
                        category: 'GD',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal3',
                        title: 'Move API App',
                        image: require('../assets/img/movie.jpg'),
                        images: [
                            { src: require('../assets/img/movie.jpg') }
                        ],
                        category: 'Dev',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal12',
                        title: 'Strategic Plan',
                        image: require('../assets/img/strat-intro-photo.jpg'),
                        images: [
                            { src: require('../assets/img/strat-intro-photo.jpg') },
                            { src: require('../assets/img/strat-photo1.jpg') }
                        ],
                        category: 'GD',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal4',
                        title: 'ToDo App',
                        image: require('../assets/img/todo.jpg'),
                        images: [
                            { src: require('../assets/img/todo.jpg') }
                        ],
                        category: 'Dev',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal13',
                        title: 'Safe at HFC',
                        image: require('../assets/img/safe-intro-photo.jpg'),
                        images: [
                            { src: require('../assets/img/safe-intro-photo.jpg') },
                            { src: require('../assets/img/safe-photo1.jpg') }
                        ],
                        category: 'GD',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal5',
                        title: 'Budget Buddy',
                        image: require('../assets/img/budget-buddy.jpg'),
                        images: [
                            { src: require('../assets/img/budget-buddy.jpg') }
                        ],
                        category: 'Dev',
                        text: [
                            { para: '' }
                        ]
                    },{
                        id: 'modal14',
                        title: 'UMI',
                        image: require('../assets/img/umig-intro-photo.jpg'),
                        images: [
                            { src: require('../assets/img/umig-intro-photo.jpg') },
                            { src: require('../assets/img/umig-photo2.jpg') }
                        ],
                        category: 'Fun',
                        text: [
                            { para: '' }
                        ]
                    }
                ]
            }
        },
        methods: {
            setFilter: function(filter) {
                this.currentFilter = filter;
            },
            openModal(ref) {
                this.$refs[ref][0].open();
            },
            closeModal(ref) {
                this.$refs[ref][0].close();
            },
        },
        components: {
            LhButton,
            LhModal
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-projects {
        width: 100%;
        padding: 4em 5.25em;

        @media (max-width: 800px) {
            padding: 2em 1.75em;
        }

        .lh-projects-buttons {
            display: flex;
            width: 100%;
            max-width: 700px;
            flex-wrap: wrap;

            > * {
                margin: 0.75em;
            }
        }

        .lh-projects-content-container {
            display: flex;
            flex-wrap: wrap;
            margin: 3em 0em;
            width: 100%;

            .lh-project-container {
                transition: all .35s ease-in-out;
                display: flex;
                cursor: pointer;

                .lh-project {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    margin: 1em;
                    align-items: center;
                    border: 1px solid var(--light-button-hover-color);

                    &:hover .overlay {
                        opacity: 1;
                    }

                    .overlay {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 100%;
                        width: 100%;
                        opacity: 0;
                        transition: .5s ease;
                        background-color: var(--projects-hover-color);
                    }

                    .lh-project-img {
                        max-width: 450px;
                        max-height: 220px;
                        background-color: $white;
                        overflow: hidden;

                        img {
                            width: 100%;
                        }
                    }

                    .lh-project-info {
                        background-color: var(--projects-background-color);
                        width: 100%;
                        text-align: center;
                        padding: 0.25em 0em;

                         h4 {
                             color: var(--projects-color);
                             margin: 0.3em 0em 0.5em;

                             @media (max-width: 500px) {
                                 font-size: 1.1em;
                             }
                         }
                    }
                }
            }   
        }
    }

    .project-popup-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .project-popup-image-container {
            margin: 2em 0em;

            .project-popup-image {
                max-width: 900px;

                img {
                    width: 100%;
                }
            }
        }

        .project-popup-text-container {
            max-width: 700px;
        }
    }

</style>