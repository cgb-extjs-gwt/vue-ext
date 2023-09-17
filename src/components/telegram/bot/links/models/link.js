import app from "#app";

export default Ext.define( "", {
    "extend": "Ext.data.Model",

    "proxy": {
        "api": {
            "read": "telegram/bots/links/get-links-list",
        },
    },

    "fields": [
        { "name": "id", "type": "string" },

        // fields
        "name",
        "description",
        "url",
        { "name": "created", "type": "date" },
        { "name": "last_user_created", "type": "date" },

        "total_users",
        "total_subscribed_users",
        "total_unsubscribed_users",
        "total_returned_users",
        "total_banned_users",

        // calculated
        { "name": "total_subscribed_users_percent", "calculate": data => app.locale.formatNumber( data.total_subscribed_users / data.total_users ) },

        { "name": "total_subscribed_users_percent_text", "calculate": data => app.locale.formatPercent( data.total_subscribed_users_percent ) },

        { "name": "total_subscribed_users_text", "calculate": data => `${data.total_subscribed_users} (${data.total_subscribed_users_percent_text})` },
    ],
} );
