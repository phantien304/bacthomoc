<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'postCreate'}" class="btn btn-success">Create new Post</router-link>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Post list</div>
            <div class="panel-body">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Website</th>
                        <th>Email</th>
                        <th width="100">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'list',
    }
</script>
