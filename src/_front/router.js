import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"221ac00e-fe0b-4a9a-8e15-da4e4aa4ab0d","homePageId":"bdb9de5a-2b62-43b1-a3f2-ec0db0676657","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":false,"isDefaultPath":false},{"lang":"ru","default":true}],"background":{},"workflows":[{"id":"c7c14db7-102d-4683-8774-b3b10bdf1251","name":"Initialize Game Time","actions":{"a056ae7f-d62e-41eb-8ff6-4fc1e4f58873":{"id":"a056ae7f-d62e-41eb-8ff6-4fc1e4f58873","code":"// Initialize game time if not already initialized\nif (!variables['d3e810fc-452e-4b4c-8553-1eb9c6910d77']) {\n  variables['d3e810fc-452e-4b4c-8553-1eb9c6910d77'] = {\n    days: 0,\n    hours: 0,\n    minutes: 0,\n    realTimeStarted: Date.now()\n  };\n}\n\n// Initialize breeds if not already initialized\nif (!variables['d4247e02-d836-4e08-826a-b1ba15c842ed'] || variables['d4247e02-d836-4e08-826a-b1ba15c842ed'].length === 0) {\n  variables['d4247e02-d836-4e08-826a-b1ba15c842ed'] = [\n    {\n      id: \"butterfly\",\n      name: \"Бабочка\",\n      fertility: 0.85,\n      weightGain: 0.75,\n      diseaseResistance: 0.7\n    },\n    {\n      id: \"soviet_chinchilla\",\n      name: \"Советская шиншилла\",\n      fertility: 0.8,\n      weightGain: 0.7,\n      diseaseResistance: 0.9\n    },\n    {\n      id: \"white_pannonian\",\n      name: \"Белый паннон\",\n      fertility: 0.7,\n      weightGain: 0.9,\n      diseaseResistance: 0.8\n    }\n  ];\n}\n\n// Initialize inventory if not already initialized\nif (!variables['2e558d77-486f-427f-87b5-f16b7b61c64f']) {\n  variables['2e558d77-486f-427f-87b5-f16b7b61c64f'] = {\n    food: {\n      basic: 0,\n      premium: 0\n    },\n    medicine: {\n      myxomatosis: 0,\n      vhd: 0\n    },\n    meat: 0\n  };\n}\n\n// Initialize notifications if not already initialized\nif (!variables['84cd6db0-07ad-4f6f-9b46-b347c76f03b7']) {\n  variables['84cd6db0-07ad-4f6f-9b46-b347c76f03b7'] = [];\n}\n\n// Initialize current view if not already initialized\nif (!variables['d1b48576-f005-4c2d-9e4a-8c8b3196081d']) {\n  variables['d1b48576-f005-4c2d-9e4a-8c8b3196081d'] = 'registration';\n}\n\n// Initialize current user if not already initialized\nif (!variables['f78e5b39-9589-4ffe-955d-7ba6c5ee0a5e']) {\n  variables['f78e5b39-9589-4ffe-955d-7ba6c5ee0a5e'] = {\n    login: \"\",\n    money: 1000,\n    farmName: \"\",\n    startingBreed: \"\"\n  };\n}\n\n// Initialize hangars if not already initialized\nif (!variables['bf98c673-5dad-430b-9db3-55cc24925b57']) {\n  variables['bf98c673-5dad-430b-9db3-55cc24925b57'] = [];\n}\n\n// Update game time every minute\nconst updateInterval = setInterval(async () => {\n  await utilsFunctions.executeGlobalFunction['254580e5-05de-4d81-b9a0-83a6e3a8559e']();\n  \n  // Process cage cleaning progress\n  const hangars = variables['bf98c673-5dad-430b-9db3-55cc24925b57'];\n  if (hangars) {\n    let updated = false;\n    \n    for (const hangar of hangars) {\n      if (!hangar.cages) continue;\n      \n      for (const cage of hangar.cages) {\n        if (cage.status === 'cleaning' && cage.cleaningEndTime) {\n          const now = Date.now();\n          const totalTime = cage.cleaningEndTime - (cage.cleaningStartTime || (cage.cleaningEndTime - 15 * 60 * 1000));\n          const elapsed = now - (cage.cleaningStartTime || (cage.cleaningEndTime - 15 * 60 * 1000));\n          \n          // Calculate progress (0-100)\n          cage.cleaningProgress = Math.min(100, Math.round((elapsed / totalTime) * 100));\n          \n          // If cleaning is complete\n          if (now >= cage.cleaningEndTime) {\n            cage.status = 'clean';\n            cage.cleaningProgress = 100;\n            delete cage.cleaningEndTime;\n            delete cage.cleaningStartTime;\n            \n            // Show notification\n            variables['84cd6db0-07ad-4f6f-9b46-b347c76f03b7'].push({\n              id: Date.now(),\n              type: 'success',\n              message: `Клетка \"${cage.name}\" успешно дезинфицирована`\n            });\n          }\n          \n          updated = true;\n        }\n      }\n    }\n    \n    // Update hangars if needed\n    if (updated) {\n      variables['bf98c673-5dad-430b-9db3-55cc24925b57'] = [...hangars];\n    }\n  }\n}, 60000); // Update every minute\n\n// Clean up interval when app unloads\nwwLib.getFrontWindow().addEventListener('beforeunload', () => {\n  clearInterval(updateInterval);\n});","next":null,"type":"custom-js"}},"trigger":"onload-app","description":"Initialize and update game time every minute","firstAction":"a056ae7f-d62e-41eb-8ff6-4fc1e4f58873","firstErrorAction":null}],"pages":[{"id":"bdb9de5a-2b62-43b1-a3f2-ec0db0676657","linkId":"bdb9de5a-2b62-43b1-a3f2-ec0db0676657","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"03e9f921-96c4-4153-8b6e-9702c249618b","sectionTitle":"Navigation Bar","linkId":"624f39d3-f211-414e-9ddb-a5a90326091f"},{"uid":"89174c4b-745e-4355-aaa9-0a58975a01fa","sectionTitle":"Main Content Section","linkId":"f95ff4fd-bd95-4f13-b20d-13b5967bc36b"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 2;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        // TODO: add staging2 ?
        '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
