var fs = require("fs");
var path = require("path");
var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();
let child_process = require('child_process');

var argv = require("minimist")(process.argv.slice(2));

ftpDeploy.on("uploading", function (data) {
    data.totalFilesCount; // total file count being transferred
    data.transferredFileCount; // number of files transferred
    data.filename; // partial path with filename being uploaded
});
ftpDeploy.on("uploaded", function (data) {
    console.log(data); // same data as uploading event
});
ftpDeploy.on("log", function (data) {
    console.clear();
    data.transferredFileCount = 0;
    console.log(data); // same data as uploading event
});

async function exec(cmd) {
    console.log(cmd);
    return child_process.execSync(cmd);
}
async function setRevision() {
    let revision = child_process.execSync('git rev-parse HEAD').toString().trim();
    fs.writeFileSync(path.join(__dirname, '../www', 'revision'), JSON.stringify({ revision: revision }), 'utf8');
    return;
}

let cfg_base = {
    user: "segin-ialk-com-br", // NOTE that this was username in 1.x
    password: "EF|W+)9_0qU{AVQ", // optional, prompted if none given
    host: "geonosis05.umbler.host",
    port: 21,
    include: ["*", "**/*"], // this would upload everything except dot files
    forcePasv: true, // Passive mode is forced (EPSV command is not sent)
    localRoot: path.join(__dirname, "../www"),
};

let cfgs = {
    'prod': {
        default: {},
        assets: {
            localRoot: path.join(__dirname, "../src/assets"),
            remoteRoot: "/public/assets/",
        },
        segin_site: {
            localRoot: path.join(__dirname, "../src/app/site"),
            remoteRoot: "/public/",
            exclude: ["assets/**/*", "svg/**/*"],
        },
        segin_web: {
            remoteRoot: "/public/web/",
            exclude: ["assets/**/*", "svg/**/*"],
            build: `ng build --configuration production --project=web --base-href /web/`
        },
        segin_app: {
            remoteRoot: "/public/app",
            exclude: ["assets/**/*", "svg/**/*"],
            build: `ng build --configuration production --project=app --base-href /app/`
        },
    }
};

(async () => {
    if (!argv) throw new Error('Nenhum argumento passado para deploy');
    if (!argv.app) throw new Error('Nenhum app definido para deploy');
    if (!argv.env) throw new Error('Ambiente não definido para o deploy');

    let cfg_deploy = Object.assign({}, cfg_base, cfgs[argv.env].default, cfgs[argv.env][argv.app]);
    console.clear();
    console.log(cfg_deploy);
    if (cfg_deploy.build)
        await exec(cfg_deploy.build);

    await setRevision();

    // ASSETS
    if (argv.assets)
        await ftpDeploy.deploy(Object.assign({}, cfg_deploy, {
            include: ["assets/**/*"],
            exclude: [],
            remoteRoot: "/var/www/html"
        }))

    console.log(cfg_deploy);


    // CODIGO APLICAÇÃO
    return Promise.resolve(true)
        .then(async start => {
            return ftpDeploy.deploy(cfg_deploy);
        })
        .then(res => console.log("finished"))
        .catch(err => console.log(err));
})();








// var fs = require("fs");
// var path = require("path");
// var FtpDeploy = require("ftp-deploy");
// var ftpDeploy = new FtpDeploy();

// let revision = require('child_process')
//     .execSync('git rev-parse HEAD')
//     .toString().trim();

// fs.writeFileSync(path.join(__dirname, '../www', 'revision'), JSON.stringify({ revision: revision }), 'utf8');
// var argv = require("minimist")(process.argv.slice(2));
// let system = 'segin';

// let config_base = {
//     port: 21,
//     include: ["*", "**/*"], // this would upload everything except dot files
//     exclude: ["assets/**/*", "svg/**/*"], //[],// e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
//     forcePasv: true // Passive mode is forced (EPSV command is not sent)
// };

// let cfgs = {
//     segin: {
//         user: "segin-ialk-com-br", // NOTE that this was username in 1.x
//         password: "EF|W+)9_0qU{AVQ", // optional, prompted if none given
//         host: "geonosis05.umbler.host",
//         localRoot: path.join(__dirname, "../www"),
//         remoteRoot: "/public/",
//     },
//     segin_web: {
//         user: "segin-ialk-com-br", // NOTE that this was username in 1.x
//         password: "EF|W+)9_0qU{AVQ", // optional, prompted if none given
//         host: "geonosis05.umbler.host",
//         localRoot: path.join(__dirname, "../www"),
//         remoteRoot: "/public/web/",
//     },
//     segin_app: {
//         user: "segin-ialk-com-br", // NOTE that this was username in 1.x
//         password: "EF|W+)9_0qU{AVQ", // optional, prompted if none given
//         host: "geonosis05.umbler.host",
//         localRoot: path.join(__dirname, "../www"),
//         remoteRoot: "/public/app/",
//     },
// }

// let config = {};
// let system_config = cfgs[system];
// config = Object.assign(config, config_base, system_config);
// console.log(config);





// // DEPLOY ASSETS

// ftpDeploy.on("uploading", function (data) {
//     data.totalFilesCount; // total file count being transferred
//     data.transferredFileCount; // number of files transferred
//     data.filename; // partial path with filename being uploaded
// });
// ftpDeploy.on("uploaded", function (data) {
//     console.log(data); // same data as uploading event
// });
// ftpDeploy.on("log", function (data) {
//     // console.clear();
//     data.transferredFileCount = 0;
//     console.log(data); // same data as uploading event
// });

// // ASSETS
// return Promise.resolve(true)
//     .then(async start => {
//         // if (argv.assets)
//         await ftpDeploy.deploy(Object.assign({}, config, {
//             include: ["assets/**/*"],
//             exclude: [],
//             remoteRoot: "/var/www/html"
//         }))


//         // use with promises
//         return ftpDeploy.deploy(config);
//     })
//     .then(res => console.log("finished"))
//     .catch(err => console.log(err));
