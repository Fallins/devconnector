# Course Note: MERN Stack Front To Back

## Setup before begin
### VSCODE
1. ES7 React/Redux/GraphQL/React-Native snippets
2. Bracket Pair Colorizer
3. Prettier - Code formatter
4. Live Server
5. Node.js Modules Intellisense

### Settings
![](https://i.imgur.com/WETPAjX.png)

### mLab
use free plan.(500MB)
1. create a mLab account
2. create a new db (choose free plan)
3. create a new db user (just for specify db)

![](https://i.imgur.com/uLbHIN1.png)

## DEVCONNECTOR
### Backend Setup
#### Install packages
```shell=
npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
npm i -D nodemon
```

#### Connect to mLab
1. create a config folder
2. create a keys.js in config folder
![](https://i.imgur.com/x37WBnI.png)
3. create an object including mongoDB connect string and export it
```javascript=
module.exports = {
    mongoURI: 'mongodb://{account}:{pass}@ds161112.mlab.com:61112/20181019',
}
```
4. In server.js connect to mongoDB 
```javascript=
// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))
```

#### Models
create models for mongoDB collections.
**First create a folder named models in root.**

##### User
1. Create User.js in the models folder
2. Create 5 properties. They're name, email, password, avatar and date.

```javascript=
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
```

##### Profile
```javascript=
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
    },
    githubusername: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                dafault: false
            },
            description: {
                type: String,
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                dafault: false
            },
            description: {
                type: String,
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// const profile = mongoose.model('profile', profileSchema)
// module.exports = profile

// same as above 
module.exports = profile = mongoose.model('profile', profileSchema)
```

##### Post
```javascript=
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        require: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                require: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema)
```

### Frontend Setup
#### Create FE project
Use `create-react-app` to create project in the root folder.
```shell=
create-react-app client
```
#### Setup
```htmlmixed=
    <!-- import bootstrap & fontawesome by CDN -->
    <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" integrity="sha384-kW+oWsYx3YpxvjtZjFXqazFpA7UP/MbiY4jvs+RWZo2+N94PFZ36T6TFkc9O3qoB" crossorigin="anonymous"></script>
    
    <!-- And import JS for bootstrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
```
## Gravatar (Globally Recognized Avatar)
> 維基百科，自由的百科全書
> 是一項用於提供在全球範圍內使用的頭像服務。只要你在Gravatar的伺服器上上傳了你自己的頭像，你便可以在其他任何支援Gravatar的部落格、論壇等地方使用它。

### Usage
use Gravatar through [node-gravatar](https://github.com/emerleite/node-gravatar)

#### Install
`npm i gravatar`

#### Example
Pass email and options then will return avatar. url
```javascript=
const avatar = gravatar.url(email, {
                s: '200', // Size
                r: 'pg',  // Rating
                d: 'mm',  // Default
            })
// => //www.gravatar.com/avatar/1fe15557309d753587b0f235023946f8?s=200&r=pg&d=mm
```
## [Concurrently](https://github.com/kimmobrunfeldt/concurrently)
Run multiple commands concurrently.

### Usage
```shell=
concurrently \"npm run server\" \"npm run client\"
```
