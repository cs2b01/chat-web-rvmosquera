$(function(){
    var url = "http://127.0.0.1:8080/messages";

    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url ,
            insertUrl: url ,
            updateUrl: url ,
            deleteUrl: url ,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        remoteOperations: {
            sorting: true,
            paging: true
        },
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [8, 12, 20]
        },
        columns: [{
            dataField: "id",
            dataType: "number",
            allowEditing: false
        }, {
            dataField: "content"
        }, {
            dataField: "sent_on",
            allowEditing: false
        }, {
            dataField: "user_from_id",
            caption: "From User",
            width: 125,
            lookup: {
                dataSource:
                    {
                    store: {
                        type: "odata",
                        url: "http://127.0.0.1:8080/users"
                    },
                    select: [
                        "id",
                        "name",
                        "password",
                        "fullname",
                    ]
                    },
                displayExpr: "name",
                valueExpr: "id"
            }

        }, {
            dataField: "user_to_id",
            caption: "To User",
            width: 125,
            lookup: {
                dataSource:
                    {
                    store: {
                        type: "odata",
                        url: "http://127.0.0.1:8080/users"
                    },
                    select: [
                        "id",
                        "name",
                        "password",
                        "fullname",
                    ]
                    }
                ,
                displayExpr: "name",
                valueExpr: "id"
            }
        }, ],
    }).dxDataGrid("instance");
});
