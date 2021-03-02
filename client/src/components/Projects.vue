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
                            { para: 'Vue.js, Node.js, PostgreSQL, Express, auth0' },
                            { para: 'I am currently in the process of developing this marketing site for Sciometrix using Vue.js for the front-end and a simple Express/Node.js API for the back-end. I have also integrated some RBAC authorization using auth0 so that users can sign up to gain access to the company whitepaper, and certain Admin-level users (our sales staff) have access to a portal that allows them to see all leads and update their contact-status as they go.' },
                            { para: 'The contacts stored in the database will also eventually be integrated with the company Salesforce CRM (ScioSales) using Heroku Connect, but I am not quite there yet in the building process. This item will be updated as I progress. Oh, I also designed the site.' }
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
                            { para: 'PHP, JS, Processwire, Docker' },
                            { para: 'I designed and developed this website as a freelance job for Specialty Medical Management. The company needed a quick marketing site that they could update on the fly themselves, so I decided to go with a lightweight CMS (Processwire) and sprinkled in some ES6 for interactivity.' },
                            { para: 'One of the challenges of this project was setting up a local development environment and deployment strategy (because testing between two different phpmyadmin installations on local and production is a nightmare.) I ended up setting up docker images for the database, Apache, PHP, and the Processwire site and deploying to the server using DockerHub.' }
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
                            { para: 'Sketch, InVision' },
                            { para: 'LoveBook needed a new customer relations management system that could scale. The company’s rapidly increasing sales was overwhelming the customer service team and they needed software designed that would make their workflow more efficient and help provide better, quicker service to customers.' },
                            { para: 'The existing tools that the customer service team used to manage customer contacts were held in separate small applications and did not do everything needed. I started the design process by making an existing feature inventory and then interviewing the customer service team to determine which additional features were needed. I also shadowed them to see exactly what their process looked like.' },
                            { para: 'After determining the list of features and organizing them according to priority I started work on the layout. The primary challenge was finding a way to pipe all of the necessary customer and order information into a small area without sacrificing the user’s ability to both quickly glance information and access tools.' },
                            { para: 'This project was incidentally also one of the first that I worked on as a front-end deveoper using jQuery and PHP.' }
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
                            { para: 'Adobe XD, ProtoPie' },
                            { para: 'LoveBook’s mission is to spread love through user-created personalized gift books. Over the course of 2018 the company rapidly changed and expanded the set of tools and features available to users, including the character and book building process. After the changes, and after some monitoring of user points-of-pain, it became clear that a redesign was necessary to make the new brand and product more clear.' },
                            { para: 'Our data showed that users encountered confusion about both the nature of the product (is it a book?) and what the process looked like once you clicked “Get Started.” To mitigate this I decided to simplify the interface and highlight the imagery. Clearer menus and calls to action. I also decided to more clearly explicate and highlight the product-creation steps instead of leaving it buried on another internal page or inside a busy image.' },
                            { para: 'Users can convert from any point during scrolling. Sectioning is also clearer so users aren’t as overwhelmed by long or dense blocks of information.' }
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
                            { para: 'Adobe XD' },
                            { para: 'This project was a bit of remote freelance web design that I was subcontracted to do for a friend of mine who runs a freelance development shop. The original client needed an entire web makeover so I worked with the developer to create some basic branding, work out the architecture of the site, and design the layout for desktop and mobile using Adobe XD.'}
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
                            { para: 'Adobe Illustrator, Adobe InDesign' },
                            { para: 'In addition to their web design and development, I was also contracted by Specialty Medical Management to design some basic branding and print collateral. I created standard stationery including letterhead, business cards, and envelopes, as well as branded folders and flyers. I worked with the company over the course of several months to develop a unified branding strategy across web and print that they felt represented their values of quality and excellence in healthcare delivery.' }
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
                            { para: 'Adobe InDesign' },
                            { para: 'This was an independent project commissioned by the then-president of Henry Ford College. The president was involved in teaching Continuous Process Improvement techniques to other educational institutions, and he needed a re-design and re-publish of the book. A small team was formed to accomplish this, and my role was to design the logo, book cover, and book layout.' },
                            { para: 'The interior layout was a challenge because the content varied and changed throughout the project. I had to design the layout to accommodate large numbers of inforgraphics that were all unique in size and style.' } 
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
                            { para: 'Adobe XD' },
                            { para: 'This project was a bit of remote freelance web design that I was subcontracted to do for a friend of mine who runs a freelance development shop. The original client needed an entire web makeover so I worked with the developer to create some basic branding, work out the architecture of the site, and design the layout for desktop and mobile using Adobe XD.' }
                        ]
                    },{
                        id: 'modal3',
                        title: 'Movie API App',
                        image: require('../assets/img/movie.jpg'),
                        images: [
                            { src: require('../assets/img/movie.jpg') }
                        ],
                        category: 'Dev',
                        text: [
                            { para: 'Angular, Typescript' },
                            { para: 'I created this Angular application during my time at Grand Circus Detroit. The app provides search capabilities on the front-end for data made available by The Movie DB API. It also allows users to mark movies they like as favorites and access later in a watchlist.' }
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
                            { para: 'Adobe InDesign' },
                            { para: 'The Strategy and Information office requested me to design a book for internal and external audiences that conveyed their strategic plan for Henry Ford College in a stylish and appealing way. I created a cover and layout design that was both unique and aligned with College branding.' },
                            { para: 'I chose the horizontal layout to better accommodate the extensive data and list-style content in the book. I also chose to focus on our darker colors to convey the more serious, solid nature of the content.' }
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
                            { para: 'Angular, Typescript' },
                            { para: 'I know every beginner developer out there has a to-do app of some sort in their reperatoire, but I included mine in this portfolio because I felt like it was a clean little app and have plans to develop it further. I built it using Angular and Typescript.' },
                            { para: 'I would like to eventually hook this up to a simple back-end and keep it for my own personal use. It was originally a project completed during my time at Grand Circus Detroit.' }
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
                            { para: 'Adobe Illustrator, Microsoft Office' },
                            { para: 'Henry Ford College recently embarked on an initiative to make the College safer and more inclusive for LGBTQ+ students. As a member of the committee that oversees this initiative, I was responsible for designing collateral to support the marketing efforts of the committee. I designed the SAFE@HFC branding and will continue to create print and web collateral as the initiative progresses.' },
                            { para: 'I designed a PowerPoint template for the committee to use when presenting to internal audiences. The iconography in the PowerPoint is original, and the layout patterns and design elements are meant to accommodate the widest possible variety of content.' }
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
                            { para: 'Javascript' },
                            { para: 'The Budget Buddy was a javascript project I did during my time at Grand Circus Detroit. It is a simple budgeting app that allows the user to track expenses by category. It also has simple login functionality. I have included it in my portfolio because it was one of my first pure javascript projects and also one of the first times I had to work with a team and organize version control between three different people.' },
                            { para: 'While the Budget Buddy may not be very sophisticated, it represents a milestone for me in development and I have plans to refactor it into a full application.' }
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
                            { para: 'Adobe Illustrator, Adobe Photoshop, Construct 2' },
                            { para: 'I participated in the design and development of UMI many years ago for fun, but I still like to include a bit about it in my portfolio because...well, it really was pretty cool. UMI is an Android mobile game that I designed and developed with my brother circa 2014. I designed and created all of the assets using Illustrator and Photoshop, and helped with the game design and development using the Construct 2 engine. The second image on this page is a neat little compilation of the main character action animations.' },
                            { para: 'This was also one of my first official forays into web development as an amateur; I designed and built a couple of static landing pages to help our efforts to promote the game on social media (using plain old HTML, CSS, and JS, and a little bit of WordPress theming.) I think we ultimately made about $900 total on UMI, but the experience was worth it!' }
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

                .lh-project {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    margin: 1em;
                    align-items: center;
                    border: 1px solid var(--light-button-hover-color);
                    cursor: pointer;

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