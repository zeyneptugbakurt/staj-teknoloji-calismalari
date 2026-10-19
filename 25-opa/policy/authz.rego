package httpapi.authz

import rego.v1

# Varsayılan: izin yok
default allow := false

# Admin her şeyi yapabilir
allow if input.user.role == "admin"

# Herkes makaleleri okuyabilir
allow if {
	input.method == "GET"
	startswith(input.path, "/articles")
	input.user.role in {"admin", "editor", "viewer"}
}

# Editor makale oluşturabilir/güncelleyebilir
allow if {
	input.method in {"POST", "PUT"}
	startswith(input.path, "/articles")
	input.user.role == "editor"
}

# Editor sadece kendi makalesini silebilir
allow if {
	input.method == "DELETE"
	input.user.role == "editor"
	input.resource.owner == input.user.name
}

# Reddedilme sebebi (debug için)
reason := "viewer sadece okuyabilir" if {
	not allow
	input.user.role == "viewer"
}
