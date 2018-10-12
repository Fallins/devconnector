const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// Load Models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'it is work in profile'
}))

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            errors.noprofile = 'There is no profile for this user'
            if(!profile) return res.status(404).json(errors)

            return res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route   POST api/profile
// @desc    Create/Edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log({body: req.body})
    const { errors, isValid } = validateProfileInput(req.body)

    // Check validation
    if(!isValid) return res.status(400).json(errors)
       
    // Get fields
    const { 
        user: { id }, 
        body: { handle, company, website, location, bio, status, githubusername,
             skills, youtube, facebook, instagram, linkedin, twitter }
    } = req
    // default profileFields
    const profileFields = {
        user: id,
        social: {}       
    }
    if(handle) profileFields.handle = handle
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    // skills - split into array
    if(typeof skills !== 'undefined') {
        profileFields.skills = skills.split(',')
    }

    // Social
    if(youtube) profileFields.social.youtube = youtube
    if(facebook) profileFields.social.facebook = facebook
    if(instagram) profileFields.social.instagram = instagram
    if(linkedin) profileFields.social.linkedin = linkedin
    if(twitter) profileFields.social.twitter = twitter
    
    Profile.findOne({user: req.user.id })
        .populate('user', ['name', 'avatar']) // combine user's data into profile model
        .then(profile => {
            if(profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                ).then(profile => res.json(profile))
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'That handle already exists'
                            res.status(400).json(errors)
                        }

                        // Save Profile
                        new Profile(profileFields).save()
                            .then(profile => res.json(profile))
                    })
            }
        })
})

// @route   GET api/profile/all
// @desc    Get all profile
// @access  Public
router.get('/all', (req, res) => {
    Profile.find()
    .populate('user', ['name', 'avatar']) // combine user's data into profile model
    .then(profiles => {
        const errors = {}
        if(!profiles) {
            errors.noprofile = 'There are no profile'
            return res.status(404).json(errors)
        }

        return res.json(profiles)
    })
    .catch(err => res.status(404).json({noprofile: 'There is no profile for this user'}))
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar']) // combine user's data into profile model
        .then(profile => {
            const errors = {}
            if(!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }

            return res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar']) // combine user's data into profile model
        .then(profile => {
            const errors = {}
            if(!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }

            return res.json(profile)
        })
        .catch(err => res.status(404).json({noprofile: 'There is no profile for this user'}))
})

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)
    
    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const { title, company, location, from, to, current, description } = req.body
            const newExp = {
                title, company, location, from, to, current, description
            }

            // Add to exp array
            profile.experience.unshift(newExp)

            profile.save()
                .then(profile => res.json(profile))
        })
})

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)
    
    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors)
    }
    
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const { school, degree, fieldofstudy, from, to, current, description } = req.body
            const newEdu = {
                school, degree, fieldofstudy, from, to, current, description
            }

            // Add to exp array
            profile.education.unshift(newEdu)

            profile.save()
                .then(profile => res.json(profile))
        })
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id)

            // Splice out of array
            profile.experience.splice(removeIndex, 1)

            // Save
            profile.save()
                .then(profile => res.json(profile))
        })
        .catch(err => res.status(404).json(err))
        
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id)

            // Splice out of array
            profile.education.splice(removeIndex, 1)

            // Save
            profile.save()
                .then(profile => res.json(profile))
        })
        .catch(err => res.status(404).json(err))
        
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }))
        })
        
})

module.exports = router