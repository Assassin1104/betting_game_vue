export default {
    data() {
        return {
            cashoutQueue: []
        };
    },
    methods: {
        capitalizeVisibility(str) {
            return capitalizeFL(str);
        },
        getComment(comment) {
            let result = comment.comment;
            if(comment.replyToIds && comment.replyToIds.length > 0) {
                comment.replyToUsers.forEach(cItem => {
                    result = result.replace(`@${cItem.alias},`, `<a href="#/user_tip_stat/${cItem._id}"><strong>@${cItem.alias}</strong></a>`);
                });
            } 
            return result;
        },
        handleLikeTip(index) {
            try {
                this.toggleLikeTip({id: this.data[index]._id}).then(({data, status, ...rest}) => {
                    if(status === 'success') {
                        this.data[index].like = data.like;
                        this.data[index].likeTip = !this.data[index].likeTip;
                    }
                });
            } catch(err) {
                displayError(err);
            }
        },
        handleFollowTip(index) {
            try {
                this.toggleFollowTip({id: this.data[index]._id}).then(({data, status, ...rest}) => {
                    if(status === 'success') {
                        this.data[index].follow = data.follow;
                        this.data[index].followTip = !this.data[index].followTip;
                    }
                });
            } catch(err) {
                displayError(err);
            }
        },
        handleFollowUser(index) {
            let userId = this.data[index].userId;
            try {
                this.toggleFollowUser({
                    toUserId: userId,
                    fromUserId: parseInt(this.loggedInUser.user_id)
                }).then(({data, status, ...rest}) => {
                    if(status === 'success') {
                        this.data[index].isFollowed = !this.data[index].isFollowed;
                        if(this.data[index].isFollowed)
                            this.data[index].followUserCount ++;
                        else
                            this.data[index].followUserCount --;
                    }
                });
            } catch(err) {
                displayError(err);
            }
        },
        handleFollowStrategy(index) {
            let strategy = this.data[index].strategyData;
            this.toggleFollowStrategy({
                id: strategy._id
            }).then(({data, status}) => {
                this.data[index].strategyData = data;
            });
        },
        handlePostComment(idx, comment) {
            let tipData = this.data[idx];
            let userId = localStorage.getItem('user_id');
            let params = {
                tipId: tipData._id,
                commentorId: parseInt(userId),
                comment: comment,
                replyToIds: tipData.replyTo.filter(rItem => comment.includes(`@${rItem.alias}`)).map(rItem => rItem._id)
            };
            try {
                this.postComment(params).then(({data, status, ...rest}) => {
                    if(status === 'success') {
                        this.data[idx].replyTo = [];
                    }
                });
            } catch(err) {
                displayError(err);
            }
        },
        handleSelectReply(idx, user) {
            let tipData = this.data[idx];
            if(!tipData.replyTo.includes(user)) {
                this.data[idx].replyTo.push(user);
            } 
        },
    }
};