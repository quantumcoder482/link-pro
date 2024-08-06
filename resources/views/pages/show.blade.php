@extends('layouts.page.header')

@section('content')

    <div id="links_page">
        <div class="links_col my_row">
            <div class="links_wrap live_page">
                <div class="inner_content live_page">
                    <div class="page_header @if (!$page->header_img) default @endif"
                         @if ($page->header_img) style="background: url({{ $page->header_img }}) no-repeat; background-size: cover;background-position: center bottom;" @endif
                    >
                        @if (!$page->header_img)
                            <img src={{ asset( 'images/default-img.png' ) }} alt="" />
                        @endif
                    </div>
                    <div id="{{ $page->profile_layout }}" class="profile_content">
                        <div class="profile_img_column @if (!$page->profile_img) default @endif">
                            <div class="profile_image">
                                <div class="image_wrap">
                                    <img src={{ $page->profile_img ? : asset( 'images/default-img.png' ) }} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div class="profile_text">
                            {!! $page->title ? "<h2>" . $page->title . "</h2>" : "" !!}
                            {!! $page->bio ? "<p>" . $page->bio . "</p>" : "" !!}
                        </div>
                    </div>
                    {{--@if ( $page->is_protected && $authorized || !$page->is_protected )--}}
                        <div class="icons_wrap main">
                            @php
                                $count = 0;
                                $folderCount = 0;
                            @endphp

                            @foreach($links as $index => $link)
                                @php ++$count @endphp
                                @if ( $count < 9 || ($count > 8 && $subscribed ) )

                                    @if($link->type == "folder" || $link->type === "mailchimp" || $link->type === "shopify")
                                        @php ++$folderCount;
                                            $dataRow = ceil(($index + 1) / 4);
                                        @endphp
                                        <div id="folder{{$folderCount}}Parent"
                                             class="icon_col @if($link->active_status)folder folder_tracker @endif"
                                             data-id="{{$link->id}}"
                                             data-row="{{ $dataRow }}"
                                             data-type="{{ $link->type }}"
                                        >
                                            @if($link->active_status)

                                                @if($link->type == "folder")
                                                    <a href="#">
                                                        <img src="{{asset('images/blank-folder-square.jpg')}}" alt="">
                                                        <div class="folder_icons live">
                                                            @foreach( array_slice($link->links, 0, 9) as $folderLink)
                                                                <div class="image_col">
                                                                    @if ( str_contains($folderLink["icon"], "custom") )
                                                                        @if ( $subscribed )
                                                                            @php $icon =  $folderLink["icon"] @endphp
                                                                        @else
                                                                            @php $icon =  null @endphp
                                                                        @endif
                                                                    @else
                                                                        @php $icon =  $folderLink["icon"] @endphp
                                                                    @endif
                                                                    <img src="{{ $icon ? : asset('/images/icon-placeholder-preview.png') }}" alt="{{$folderLink["name"]}}" title="{{$folderLink["name"]}}">
                                                                </div>
                                                            @endforeach
                                                        </div>
                                                    </a>

                                                @else
                                                    <a href="#">
                                                        <img src="{{ $link->icon ? : asset('/images/icon-placeholder-preview.png') }}" alt="" />
                                                    </a>
                                                @endif

                                                @if($link->name)
                                                    @php if ($link->name && strlen($link->name) > 11 ) {
                                                        $name = substr($link->name, 0, 11) . "...";
                                                    } else {
                                                        $name = $link->name;
                                                    }
                                                    @endphp
                                                    <p>{{$name}}</p>
                                                @endif

                                                @if ($link->type === "folder")
                                                    <div id="folder{{$folderCount}}" class="my_row folder" data-parent="#folder{{$folderCount}}Parent">
                                                        <div class="icons_wrap inner">
                                                            @foreach( $link->links as $folderLink)
                                                                @if ($folderLink["email"])
                                                                    @php $source = "mailto:" . $folderLink["email"] @endphp
                                                                @elseif ($folderLink["phone"])
                                                                    @php $source = "tel:" . $folderLink["phone"] @endphp
                                                                    @if(str_contains($folderLink["icon"], "Facetime"))
                                                                        @php $source = "facetime:" . $folderLink["phone"] @endphp
                                                                    @endif
                                                                @else
                                                                    @php $source = $folderLink["url"] @endphp
                                                                @endif
                                                                <div class="icon_col">
                                                                    <a class="link_tracker" href="{{$source}}" target="_blank" data-id="{{$folderLink["id"]}}">
                                                                        <div class="hover_text">
                                                                            <p>{{$folderLink["name"]}}</p>
                                                                        </div>
                                                                        @if ( str_contains($folderLink["icon"], "custom") )
                                                                            @if ( $subscribed )
                                                                                @php $icon =  $folderLink["icon"] @endphp
                                                                            @else
                                                                                @php $icon =  null @endphp
                                                                            @endif
                                                                        @else
                                                                            @php $icon =  $folderLink["icon"] @endphp
                                                                        @endif
                                                                        <img src="{{ $icon ? : asset('/images/icon-placeholder-preview.png') }}" alt="{{ $folderLink["name"] }}" title="{{ $folderLink["name"] }}" />
                                                                    </a>
                                                                    @php if ($folderLink["name"] && strlen($folderLink["name"]) > 11 ) {
                                                                            $name = substr($folderLink["name"], 0, 11) . "...";
                                                                        } else {
                                                                            $name = $folderLink["name"];
                                                                        }
                                                                    @endphp
                                                                    <p>{{ $name }}</p>
                                                                </div>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                @endif

                                                @if($link->type === "mailchimp")
                                                    <div id="folder{{$folderCount}}" class="my_row folder" data-parent="#folder{{$folderCount}}Parent">
                                                        <div class="form_wrap">
                                                            <div class="form_content">
                                                                <form id="mc_subscribe_form" method="post" action="/">
                                                                    @csrf
                                                                    <h3>Enter Your Email To Subscribe.</h3>
                                                                    <input id="email" type="email" name="email" placeholder="Email Address" required>
                                                                    <input id="list_id" type="hidden" value={{$link->mailchimp_list_id}}>
                                                                    <input id="user_id" type="hidden" value={{ $link->user_id }}>
                                                                    <button class="button blue" type="submit">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                            <div id="subscribe_error" class="error text-red-800"></div>
                                                        </div>
                                                    </div>
                                                @endif

                                                @if($link->type === "shopify")
                                                    <div  id="folder{{$folderCount}}" class="my_row folder" data-parent="#folder{{$folderCount}}Parent">
                                                        <div class="form_wrap">
                                                            <div class="products_grid folder">
                                                                @if ($link->shopify_products !== null)
                                                                    @foreach($link->shopify_products as $product)
                                                                        <div class="single_product">
                                                                            <a href="{{ $product["product_url"] }}" target="_blank">
                                                                                <div class="image_wrap">
                                                                                    <img src="{{ $product["image_url"]}}" alt="{{ $product["title"] }}"/>
                                                                                </div>
                                                                                <h3>{{ $product["title"] }}</h3>
                                                                                <p><sup>$</sup>{{ $product["price"] }}</p>
                                                                            </a>
                                                                        </div>
                                                                    @endforeach
                                                                @endif
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif

                                            @endif
                                        </div>
                                    @else {{--reguler icon--}}
                                        <div class="icon_col">
                                            @if($link->active_status)
                                                @if ($link->email)
                                                    @php $source = "mailto:" . $link->email @endphp
                                                @elseif ($link->phone)
                                                    @php $source = "tel:" . $link->phone @endphp
                                                    @if(str_contains($link->icon, "Facetime"))
                                                        @php $source = "facetime:" . $link->phone @endphp
                                                    @endif
                                                @else
                                                  @php $source = $link->url @endphp
                                                @endif

                                                <a class="link_tracker" data-id="{{$link->id}}" href="{{ $source ? : '#' }}"
                                                   target="_blank"
                                                   rel="nofollow"
                                                >
                                                    <div class="hover_text">
                                                        <p>{{$link->name}}</p>
                                                    </div>
                                                    @if ( str_contains($link->icon, "custom") )
                                                        @if ( $subscribed )
                                                            @php $icon =  $link->icon @endphp
                                                        @else
                                                            @php $icon =  null @endphp
                                                        @endif
                                                    @else
                                                        @php $icon =  $link->icon @endphp
                                                    @endif
                                                    <img src="{{ $icon ? : asset('/images/icon-placeholder-preview.png') }}" alt="" />
                                                </a>
                                                @php if ($link->name && strlen($link->name) > 11 ) {
                                                        $name = substr($link->name, 0, 11) . "...";
                                                    } else {
                                                        $name = $link->name;
                                                    }
                                                @endphp
                                                <p>{{ $name ? : "Link Name" }}</p>
                                            @endif
                                        </div>
                                    @endif
                                @endif
                            @endforeach
                        </div><!-- icons_wrap -->
                    {{--@elseif ($page->is_protected && !$authorized)
                        <form method="post" action="{{ url('/check-page-auth/' . $page->id)  }}" >
                            @csrf
                            <h2>Page Secure</h2>
                            <p>Enter your pin to continue</p>
                            @if($errors->any())
                                <p class="alert-warning">{{ $errors->first() }}</p>
                            @endif
                            <input name="pin" type="text">
                            <button type="submit" class="button blue">Enter</button>
                        </form>
                    @endif--}}
                </div>
            </div>
        </div>
    </div>

@endsection
