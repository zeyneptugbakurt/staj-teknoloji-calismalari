package httpapi.authz_test

import rego.v1

import data.httpapi.authz

test_admin_can_do_anything if {
	authz.allow with input as {"user": {"name": "ali", "role": "admin"}, "method": "DELETE", "path": "/articles/1"}
}

test_viewer_can_read if {
	authz.allow with input as {"user": {"name": "veli", "role": "viewer"}, "method": "GET", "path": "/articles/1"}
}

test_viewer_cannot_write if {
	not authz.allow with input as {"user": {"name": "veli", "role": "viewer"}, "method": "POST", "path": "/articles"}
}

test_editor_can_delete_own if {
	authz.allow with input as {"user": {"name": "ayse", "role": "editor"}, "method": "DELETE", "path": "/articles/1", "resource": {"owner": "ayse"}}
}

test_editor_cannot_delete_others if {
	not authz.allow with input as {"user": {"name": "ayse", "role": "editor"}, "method": "DELETE", "path": "/articles/1", "resource": {"owner": "mehmet"}}
}
