import app from "#app";

export default Ext.define( "", {
    "extend": "Ext.data.Model",

    "fields": [
        { "name": "id", "type": "string" },

        // fields
        "acl_id",
        { "name": "acl_user_permissions", "convert": value => new Set( value ) },
        "type",
        { "name": "static", "type": "bool" },
        "locales",
        { "name": "created", "type": "date" },

        "name",
        "short_description",
        "description",

        "telegram_id",
        "telegram_username",
        { "name": "telegram_can_join_groups", "type": "bool" },
        { "name": "telegram_can_read_all_group_messages", "type": "bool" },
        { "name": "telegram_supports_inline_queries", "type": "bool" },

        { "name": "last_user_created", "type": "date" },
        "total_users",
        "total_subscribed_users",
        "total_unsubscribed_users",
        "total_returned_users",
        "total_banned_users",

        { "name": "started", "type": "bool" },
        { "name": "error", "type": "bool" },
        "error_text",

        // calculated
        { "name": "name_html", "calculate": data => `<b>${data.name}</b><br/>@${data.telegram_username}` },

        { "name": "can_update", "calculate": data => data.acl_user_permissions.has( "telegram/bot:update" ) },
        { "name": "can_update_acl", "calculate": data => data.acl_user_permissions.has( "acl:update" ) },
        { "name": "can_delete", "calculate": data => !data.static && data.acl_user_permissions.has( "telegram/bot:delete" ) },
        { "name": "can_change_api_key", "calculate": data => !data.static && data.acl_user_permissions.has( "telegram/bot:update" ) },
        { "name": "can_start", "calculate": data => data.acl_user_permissions.has( "telegram/bot:update" ) && !data.started },
        { "name": "can_stop", "calculate": data => data.acl_user_permissions.has( "telegram/bot:update" ) && data.started },

        { "name": "status_text", "calculate": data => ( data.started ? app.locale.l10n( `Started` ) : app.locale.l10n( `Stopped` ) ) },

        {
            "name": "last_user_created_text",
            calculate ( data ) {
                if ( data.last_user_created ) {
                    return `${app.locale.formatDate( data.last_user_created )} (${app.locale.formatRelativeTime( data.last_user_created )})`;
                }
                else {
                    return "--";
                }
            },
        },

        { "name": "total_subscribed_users_percent", "calculate": data => app.locale.formatNumber( data.total_subscribed_users / data.total_users ) },
        { "name": "total_subscribed_users_percent_text", "calculate": data => app.locale.formatPercent( data.total_subscribed_users_percent ) },

        { "name": "total_subscribed_users_text", "calculate": data => `${data.total_subscribed_users} (${data.total_subscribed_users_percent_text})` },

        { "name": "total_unsubscribed_users_percent", "calculate": data => app.locale.formatNumber( data.total_unsubscribed_users / data.total_users ) },
        { "name": "total_unsubscribed_users_percent_text", "calculate": data => app.locale.formatPercent( data.total_unsubscribed_users_percent ) },
        { "name": "total_unsubscribed_users_text", "calculate": data => `${data.total_unsubscribed_users} (${data.total_unsubscribed_users_percent_text})` },

        { "name": "url", "calculate": data => `https://t.me/${data.telegram_username}` },
    ],
} );
