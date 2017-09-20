/**
 * @fileOverview This file has functions related to setting view. This view calling from application view.
 * Available Object:
 *	App.boards						: this object contain all boards(Based on logged in user)
 *	this.model						: page view id.
 */
if (typeof App === 'undefined') {
    App = {};
}
App.SettingView = Backbone.View.extend({
    /**
     * Constructor
     * initialize default values and actions
     */
    initialize: function(options) {
        if (!_.isUndefined(this.model) && this.model !== null) {
            this.model.showImage = this.showImage;
        }
        this.id = options.id;
        this.getListing();
    },
    template: JST['templates/setting_list'],
    /**
     * Events
     * functions to fire on events (Mouse events, Keyboard Events, Frame/Object Events, Form Events, Drag Events, etc...)
     */
    events: {
        'submit form#js-setting-list-form': 'updateSetting',
    },

    /**
     * updateSetting()
     * @return false
     */
    updateSetting: function(e) {
        var target = $(e.currentTarget);
        var data = target.serializeObject();
        if (!_.isUndefined(data.DEFAULT_CARD_VIEW)) {
            DEFAULT_CARD_VIEW = data.DEFAULT_CARD_VIEW;
        }
        if ($(e.target).find('#input_setting_category_id').val() === '14') {
            data.IS_LIST_NOTIFICATIONS_ENABLED = 'false';
            if (!_.isUndefined($("input[name='IS_LIST_NOTIFICATIONS_ENABLED']:checked").val())) {
                data.IS_LIST_NOTIFICATIONS_ENABLED = 'true';
            }
            data.IS_CARD_NOTIFICATIONS_ENABLED = 'false';
            if (!_.isUndefined($("input[name='IS_CARD_NOTIFICATIONS_ENABLED']:checked").val())) {
                data.IS_CARD_NOTIFICATIONS_ENABLED = 'true';
            }
            data.IS_CARD_MEMBERS_NOTIFICATIONS_ENABLED = 'false';
            if (!_.isUndefined($("input[name='IS_CARD_MEMBERS_NOTIFICATIONS_ENABLED']:checked").val())) {
                data.IS_CARD_MEMBERS_NOTIFICATIONS_ENABLED = 'true';
            }
            data.IS_CARD_LABELS_NOTIFICATIONS_ENABLED = 'false';
            if (!_.isUndefined($("input[name='IS_CARD_LABELS_NOTIFICATIONS_ENABLED']:checked").val())) {
                data.IS_CARD_LABELS_NOTIFICATIONS_ENABLED = 'true';
            }
            data.IS_CARD_CHECKLISTS_NOTIFICATIONS_ENABLED = 'false';
            if (!_.isUndefined($("input[name='IS_CARD_CHECKLISTS_NOTIFICATIONS_ENABLED']:checked").val())) {
                data.IS_CARD_CHECKLISTS_NOTIFICATIONS_ENABLED = 'true';
            }
            data.IS_CARD_ATTACHMENTS_NOTIFICATIONS_ENABLED = 'false';
            if (!_.isUndefined($("input[name='IS_CARD_ATTACHMENTS_NOTIFICATIONS_ENABLED']:checked").val())) {
                data.IS_CARD_ATTACHMENTS_NOTIFICATIONS_ENABLED = 'true';
            }
        }
        var self = this;
        var settingModel = new App.SettingCategory();
        settingModel.url = api_url + 'settings.json';
        settingModel.save(data, {
            success: function(model, response) {
                if (!_.isEmpty(response.success)) {
                    self.flash('success', i18next.t('Settings updated successfully.'));
                } else {
                    self.flash('danger', i18next.t('Settings not updated properly.'));
                }
            }
        });
        return false;
    },
    /** 
     * getListing()
     * get settings
     * @return false
     */
    getListing: function() {
        self = this;
        if (_.isUndefined(this.id)) {
            this.id = 3;
        }
        settingsCol = new App.SettingCategoryCollection();
        settingsCol.url = api_url + 'settings/' + this.id + '.json';
        settingsCol.fetch({
            cache: false,
            abortPending: true,
            success: function(collections, response) {
                console.log(collections);
                self.render(collections);
            }
        });
    },
    /**
     * render()
     * populate the html to the dom
     * @param NULL
     * @return object
     *
     */
    render: function(collections) {
        this.$el.html(this.template({
            list: collections,
            id: this.id
        }));
        $('.js-admin-setting-menu').addClass('active');
        $('.js-admin-activity-menu, .js-admin-user-menu, .js-admin-email-menu, .js-admin-role-menu, .js-admin-board-menu').removeClass('active');
        return this;
    }
});
