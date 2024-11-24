<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <div class="container mt-3">
        <form action="{{route('signup')}}" method="post">
            @csrf
            <div class='mb-3'>
                <label class="form-label" for='name'>Name</label>
                <input type="text" class="form-control" name='name' placeholder="name">
            </div>
            <div class='mb-3'>
                <label class="form-label" for='email'>Email</label>
                <input type="email" class="form-control" name='email' placeholder="Email">
            </div>

            <div class='mb-3'>
                <label class="form-label" for='password'>Password</label>
                <input type="password" class="form-control" name='password' placeholder="Password">
            </div>
            <div class='mb-3'>
                <label class="form-label" for='password_confirmation'>Confirm Password</label>
                <input type="password" class="form-control" name='password_confirmation' placeholder="Confirm Password">
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>

        </form>
    </div>

</body>

</html>